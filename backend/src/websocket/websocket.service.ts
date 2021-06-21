import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/user/dto/User';
import { UserService } from 'src/user/user.service';
import { ISocketQuery } from './interfaces/SocketQuery';

@Injectable()
export class WebsocketService {
  constructor(protected readonly userService: UserService) {}

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

      // Send user data to the client
      socket.emit('user', user);
    }
    // User was found
    else {
      // Set user online status
      await this.userService.updateUserStatus(user.username, true);
    }

    // Create user connection record
    await this.userService.createUserConnection(user.username, socket.id);
  }

  async onDisconnect(socket: Socket) {
    const user = await this.userService.findUserByConnectionId(socket.id);
    // Set user offline status
    await this.userService.updateUserStatus(user.username, false);
    // Delete user connection record
    await this.userService.deleteUserConnectionByConnectionId(socket.id);
  }
}
