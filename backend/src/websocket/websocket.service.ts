import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
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
    // User was found
    else {
      // Set user online status
      await this.userService.updateUserStatus(user.username, true);
    }

    // Send user data to the client
    socket.emit('user', user);

    // Create user connection record
    await this.userService.createUserConnection(user.username, socket.id);

    // Send interlocutors list
    const users = await this.userService.findUserInterlocutors(user.username);

    socket.emit('users', users);
    socket.broadcast.emit('user_connected', {
      ...user,
      isOnline: true,
    });

    socket.emit('bots', this.botService.getBots());

    // Send messages list
    const messages = await this.messageService.findUserMessages(user.username);
    socket.emit('messages', messages);

    // Set up spam bot
    this.botService.spamBotHandler(socket, user.username);
  }

  async onDisconnect(socket: Socket) {
    const user = await this.userService.findUserByConnectionId(socket.id);
    // Set user offline status
    await this.userService.updateUserStatus(user.username, false);
    // Delete user connection record
    await this.userService.deleteUserConnectionByConnectionId(socket.id);

    socket.broadcast.emit('user_disconnected', {
      ...user,
      isOnline: false,
    });
  }

  async onMessage(server: Server, message: Message) {
    await this.messageService.createMessage(message);
    const interlocutor = await this.userService.findUserConnectionByUsername(
      message.receiver,
    );

    if (interlocutor)
      server.to(interlocutor.connectionId).emit('message', message);
  }

  async handleBotMessage(socket: Socket, message: Message) {
    this.botService.handleBotMessage(socket, message);
  }
}
