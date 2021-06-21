import { Injectable } from '@nestjs/common';
import { IdentificatorService } from 'src/infrastructure/identificator.service';
import { UserRepository } from './user.repository';
import { User } from './dto/User';
import { UserStatus } from './dto/UserStatus';
import { UserConnection } from './dto/UserConnection';

@Injectable()
export class UserService {
  private _usernameLength = 7;
  private _defaultAvatar = 'default.png';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly identificatorService: IdentificatorService,
  ) {}

  async createUser(): Promise<User> {
    // Generate username
    const username = this.identificatorService.generateAlphaNumeric(
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
