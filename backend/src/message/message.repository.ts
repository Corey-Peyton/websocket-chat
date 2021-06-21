import { Injectable } from '@nestjs/common';
import { QueryConfig } from 'pg';
import { DatabaseService } from 'src/infrastructure/database.service';
import { Message } from './dto/Message';

const MESSAGES_TABLE = 'messages';

@Injectable()
export class MessageRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async insertMessage(message: Message): Promise<void> {
    const sql = `
      insert into ${MESSAGES_TABLE} (sender, receiver, content, sent_at) values($1, $2, $3, $4)
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [
        message.sender,
        message.receiver,
        message.content,
        message.sentAt,
      ],
    };

    await this.databaseService.query(queryConfig);
  }

  async selectMessagesByUsername(username: string): Promise<Message[]> {
    const sql = `
      select
        m.sender as "sender",
        m.receiver as "receiver",
        m.content as "content",
        m.sent_at as "sentAt"
      from ${MESSAGES_TABLE} m
      where m.sender = $1 or m.receiver = $1
    `;

    const queryConfig: QueryConfig = {
      text: sql,
      values: [username],
    };

    const queryResult = await this.databaseService.query(queryConfig);
    return queryResult.rows;
  }
}
