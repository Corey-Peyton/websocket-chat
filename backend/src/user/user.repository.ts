import { Injectable } from '@nestjs/common';
import { QueryConfig } from 'pg';
import { DatabaseService } from 'src/infrastructure/database.service';
import { User } from './dto/User';
import { UserConnection } from './dto/UserConnection';
import { UserStatus } from './dto/UserStatus';

const USERS_TABLE = 'users';
const USERS_CONNECTIONS_TABLE = 'users_connections';
const USERS_STATUSES_TABLE = 'users_statuses';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  // User queries
  async insertUser(user: User): Promise<void> {
    const sql = `
      insert into ${USERS_TABLE} (username, avatar) values ($1, $2)
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [user.username, user.avatar],
    };

    await this.databaseService.query(queryConfig);
  }

  async selectUserByUsername(username: string): Promise<User> {
    const sql = `
      select 
        u.username as "username", 
        u.avatar as "avatar"
      from ${USERS_TABLE} u
      where u.username = $1
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [username],
    };

    const queryResult = await this.databaseService.query(queryConfig);
    if (queryResult.rowCount) return queryResult.rows[0];
  }

  async selectUsersWithStatus(): Promise<User[]> {
    const sql = `
      select 
        u.username,
        u.avatar,
        us.is_online
      from ${USERS_TABLE} u
        inner join ${USERS_STATUSES_TABLE} us
          on u.username = us.username
    `;

    const queryConfig: QueryConfig = {
      text: sql,
    };

    const queryResult = await this.databaseService.query(queryConfig);
    return queryResult.rows;
  }

  // Users connections queries
  async insertUserConnection(userConnection: UserConnection): Promise<void> {
    const sql = `
      insert into ${USERS_CONNECTIONS_TABLE} (username, connection_id) values ($1, $2)
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [userConnection.username, userConnection.connectionId],
    };

    await this.databaseService.query(queryConfig);
  }

  async selectUserConnectionByConnectionId(
    connectionId: string,
  ): Promise<UserConnection> {
    const sql = `
      select 
        uc.username,
        uc.connection_id
      from ${USERS_CONNECTIONS_TABLE}
      where uc.connection_id = $1
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [connectionId],
    };

    const queryResult = await this.databaseService.query(queryConfig);
    if (queryResult.rowCount) return queryResult.rows[0];
  }

  async deleteUserConnectionByConnectionId(
    connectionId: string,
  ): Promise<void> {
    const sql = `
      delete from ${USERS_CONNECTIONS_TABLE} uc where uc.connection_id = $1
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [connectionId],
    };

    await this.databaseService.query(queryConfig);
  }

  // Users online statuses queries
  async insertUserStatus(userStatus: UserStatus): Promise<void> {
    const sql = `
      insert into ${USERS_STATUSES_TABLE} (username, is_online) values ($1, $2)
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [userStatus.username, userStatus.isOnline],
    };
  }

  async updateUserStatus(userStatus: UserStatus): Promise<void> {
    const sql = `
      update ${USERS_STATUSES_TABLE} us set us.is_online=$1 where us.username = $1
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [userStatus.isOnline, userStatus.username],
    };

    await this.databaseService.query(queryConfig);
  }
}
