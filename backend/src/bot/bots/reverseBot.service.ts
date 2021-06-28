import { Injectable } from '@nestjs/common';
import { Message } from 'src/message/dto/Message';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { botTypes } from '../types/botTypes';

@Injectable()
export class ReverseBotHandler {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  async handleMessage(
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    this.messageService.createMessage(message);

    const reversedContent = message.content.split('').reverse().join('');
    setTimeout(async () => {
      const receiverConnections =
        await this.userService.findUserConnectionsByUsername(message.sender);
      const botMessage: Message = {
        sender: botTypes.reverseBot,
        receiver: message.sender,
        content: reversedContent,
        sentAt: new Date(),
      };

      await this.messageService.createMessage(botMessage);
      sendTo(receiverConnections, 'message', botMessage);
    }, 3000);
  }
}
