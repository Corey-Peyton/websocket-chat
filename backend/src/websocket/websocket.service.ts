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

  async onConnect(
    socket: Socket,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    const username = (socket.handshake.query as ISocketQuery).username;
    let user: User;

    if (username) {
      user = await this.userService.findUserByUsername(username);
    }

    // User was not found or username was null
    if (!user) {
      [user] = await Promise.all([
        this.userService.createUser(),
        this.userService.createUserStatus(user.username),
      ]);
    }

    // Get other user connections with the same username
    const connections: string[] =
      await this.userService.findUserConnectionsByUsername(user.username);

    // User's first tab
    if (!connections.length) {
      await this.userService.updateUserStatus(user.username, true);

      // Notify other users about current user online status
      socket.broadcast.emit('interlocutor_connected', {
        ...user,
        isOnline: true,
      });

      // Set up spam bot handler
      this.botService.startSpamBot(user.username, sendTo);
    }

    const [interlocutors, messages] = await Promise.all([
      this.userService.findUserInterlocutors(user.username),
      this.messageService.findUserMessages(user.username),
      // Create user connection record
      this.userService.createUserConnection(user.username, socket.id),
    ]);

    socket.emit('user', user);
    socket.emit('interlocutors', interlocutors);
    socket.emit('bots', this.botService.getBots());
    socket.emit('messages', messages);
  }

  async onDisconnect(socket: Socket) {
    const [user] = await Promise.all([
      this.userService.findUserByConnectionId(socket.id),
      this.userService.deleteUserConnectionByConnectionId(socket.id),
    ]);

    const { username } = user;

    // Get connections with the same username
    const connections: string[] =
      await this.userService.findUserConnectionsByUsername(username);

    // The last username connection
    if (!connections.length) {
      // Set user offline status
      await this.userService.updateUserStatus(username, false);
      socket.broadcast.emit('interlocutor_disconnected', {
        ...user,
        isOnline: false,
      });

      // Disable spam bot for the current user
      this.botService.disableSpamBot(username);
    }
  }

  async onMessage(
    socket: Socket,
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    const [connections, interlocutors] = await Promise.all([
      // Get connections with the same username
      this.userService.findUserConnectionsByUsername(message.sender),
      // Find connections with the receiver username
      this.userService.findUserConnectionsByUsername(message.receiver),
      this.messageService.createMessage(message),
    ]);

    const sendList = [
      ...connections.filter((uc) => uc !== socket.id),
      ...interlocutors,
    ];

    if (interlocutors.length) sendTo(sendList, 'message', message);
  }

  async handleBotMessage(
    socket: Socket,
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    // Send message to other tabs
    const connections = await this.userService.findUserConnectionsByUsername(
      message.sender,
    );

    const sendList = connections.filter(
      (connection) => connection !== socket.id,
    );

    sendTo(sendList, 'message', message);
    this.botService.handleMessage(message, sendTo);
  }
}
