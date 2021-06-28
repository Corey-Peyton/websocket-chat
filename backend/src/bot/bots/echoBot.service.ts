import { Injectable } from '@nestjs/common';
import { Message } from 'src/message/dto/Message';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { botTypes } from '../types/botTypes';

@Injectable()
export class EchoBotHandler {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  async handleMessage(
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    this.messageService.createMessage(message);

    const receiverConnections =
      await this.userService.findUserConnectionsByUsername(message.sender);

    const botMessage: Message = {
      sender: botTypes.echoBot,
      receiver: message.sender,
      content: message.content,
      sentAt: new Date(),
    };

    await this.messageService.createMessage(botMessage);
    sendTo(receiverConnections, 'message', botMessage);
  }
}
