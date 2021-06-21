import { Injectable } from '@nestjs/common';
import { IdentificatorService } from 'src/infrastructure/identificator.service';
import { UserRepository } from './user.repository';
import { User } from './dto/User';

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
    // await this.userRepository.insertUser(user);

    return user;
  }
}
