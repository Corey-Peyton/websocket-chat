import { Injectable } from '@nestjs/common';
import { Message } from './dto/Message';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}
  async createMessage(message: Message) {
    // Save message to the database
    await this.messageRepository.insertMessage(message);
  }

  async findUserMessages(username: string): Promise<Message[]> {
    return await this.messageRepository.selectMessagesByUsername(username);
  }
}
