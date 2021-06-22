import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { BotService } from 'src/bot/bot.service';
import { Message } from 'src/message/dto/Message';
import { MessageService } from 'src/message/message.service';
import { User } from 'src/user/dto/User';
import { UserService } from 'src/user/user.service';
import { ISocketQuery } from './interfaces/SocketQuery';

@Injectable()
export class WebsocketService {
  constructor(
    protected readonly userService: UserService,
    protected readonly botService: BotService,
    protected readonly messageService: MessageService,
  ) {}

  async onConnect(socket: Socket) {
    const username = (socket.handshake.query as ISocketQuery).username;

    let user: User;

    // Try to find user in the database
    if (username) {
      user = await this.userService.findUserByUsername(username);
    }

    // User was not found or username was null
    if (!user) {
      // Create user and user status records
      user = await this.userService.createUser();
      await this.userService.createUserStatus(user.username);
    }

    const userConnections: string[] =
      await this.userService.findUserConnectionsByUsername(user.username);

    // User's first tab
    if (!userConnections.length) {
      // Set user online status
      await this.userService.updateUserStatus(user.username, true);
      socket.broadcast.emit('user_connected', { ...user, isOnline: true });
    }

    // Send user data to the client
    socket.emit('user', user);

    // Create user connection record
    await this.userService.createUserConnection(user.username, socket.id);

    // Send interlocutors list
    const users = await this.userService.findUserInterlocutors(user.username);

    socket.emit('users', users);
    socket.emit('bots', this.botService.getBots());

    // Send messages list
    const messages = await this.messageService.findUserMessages(user.username);
    socket.emit('messages', messages);

    // Set up spam bot
    // this.botService.spamBotHandler(socket, user.username);
  }

  async onDisconnect(socket: Socket) {
    const user = await this.userService.findUserByConnectionId(socket.id);
    await this.userService.deleteUserConnectionByConnectionId(socket.id);

    const userConnections: string[] =
      await this.userService.findUserConnectionsByUsername(user.username);

    if (!userConnections.length) {
      // Set user offline status
      await this.userService.updateUserStatus(user.username, false);
      socket.broadcast.emit('user_disconnected', {
        ...user,
        isOnline: false,
      });
    }
  }

  async onMessage(
    socket: Socket,
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    await this.messageService.createMessage(message);
    const connections: string[] =
      await this.userService.findUserConnectionsByUsername(message.sender);
    const interlocutors: string[] =
      await this.userService.findUserConnectionsByUsername(message.receiver);

    const sendList = [
      ...connections.filter((uc) => uc !== socket.id),
      ...interlocutors,
    ];

    if (interlocutors.length) sendTo(sendList, 'message', message);
  }

  async handleBotMessage(socket: Socket, message: Message) {
    this.botService.handleBotMessage(socket, message);
  }
}
