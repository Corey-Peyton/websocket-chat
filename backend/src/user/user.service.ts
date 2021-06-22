import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UtilityService } from 'src/infrastructure/utility.service';
import { UserRepository } from './user.repository';
import { User } from './dto/User';
import { UserStatus } from './dto/UserStatus';
import { UserConnection } from './dto/UserConnection';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  private _usernameLength = 7;
  private _defaultAvatar = 'default.png';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly utilityService: UtilityService,
  ) {}

  // Used if server was dropped before all connections severed
  async onApplicationBootstrap() {
    // Remove connections from the last session
    await this.userRepository.deleteUserConnections();

    // Set all users status to offline
    await this.userRepository.updateUsersStatus(false);
  }

  async createUser(): Promise<User> {
    // Generate username
    const username = this.utilityService.generateAlphaNumeric(
      this._usernameLength,
    );

    // Form User DTO object
    const user: User = {
      username,
      avatar: this._defaultAvatar,
    };

    // Create user record in the database
    await this.userRepository.insertUser(user);

    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.selectUserByUsername(username);
  }

  async findUserByConnectionId(connectionId: string): Promise<User> {
    return await this.userRepository.selectUserByConnectionId(connectionId);
  }

  async findUserInterlocutors(username: string): Promise<User[]> {
    const users = await this.userRepository.selectUsersWithStatus();
    return users.filter((user) => user.username !== username);
  }

  async createUserStatus(username: string): Promise<void> {
    const userStatus: UserStatus = {
      username,
      isOnline: true,
    };

    await this.userRepository.insertUserStatus(userStatus);
  }

  async updateUserStatus(username: string, isOnline: boolean): Promise<void> {
    const userStatus: UserStatus = {
      username,
      isOnline,
    };

    await this.userRepository.updateUserStatus(userStatus);
  }

  async findUserConnectionsByUsername(username: string): Promise<string[]> {
    const userConnections =
      await this.userRepository.selectUserConnectionsByUsername(username);
    return userConnections.map((uc) => uc.connectionId);
  }

  async createUserConnection(
    username: string,
    connectionId: string,
  ): Promise<void> {
    const userConnection: UserConnection = {
      username,
      connectionId,
    };

    await this.userRepository.insertUserConnection(userConnection);
  }

  async deleteUserConnectionByConnectionId(
    connectionId: string,
  ): Promise<void> {
    await this.userRepository.deleteUserConnectionByConnectionId(connectionId);
  }
}
