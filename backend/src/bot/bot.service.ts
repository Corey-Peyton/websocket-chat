import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Message } from 'src/message/dto/Message';
import { MessageService } from 'src/message/message.service';
import { IBot } from './interfaces/IBot';

@Injectable()
export class BotService {
  private _bots: IBot[] = [
    { username: 'Echo bot', avatar: 'echobot.png' },
    { username: 'Reverse bot', avatar: 'reversebot.png' },
    { username: 'Spam bot', avatar: 'spambot.png' },
    { username: 'Ignore bot', avatar: 'ignorebot.png' },
  ];

  constructor(private readonly messageService: MessageService) {}

  getBots() {
    return this._bots;
  }

  async handleBotMessage(socket: Socket, message: Message) {
    this.messageService.createMessage(message);

    switch (message.receiver) {
      case 'Echo bot':
        await this.echoBotHandler(socket, message);
        break;
      case 'Reverse bot':
        this.reverseBotHandler(socket, message);
        break;
    }
  }

  spamBotHandler(socket: Socket, username: string) {
    const messageContent = 'Hello from Spam bot!';
    const timeout = Math.round(Math.random() * (120 - 10) + 10) * 1000;

    setTimeout(async () => {
      const botMessage: Message = {
        sender: 'Spam bot',
        receiver: username,
        content: messageContent,
        sentAt: new Date(),
      };

      await this.messageService.createMessage(botMessage);
      socket.emit('message', botMessage);
      this.spamBotHandler(socket, username);
    }, timeout);
  }

  private async echoBotHandler(socket: Socket, message: Message) {
    const botMessage: Message = {
      sender: 'Echo bot',
      receiver: message.sender,
      content: message.content,
      sentAt: new Date(),
    };

    await this.messageService.createMessage(botMessage);
    socket.emit('message', botMessage);
  }

  private reverseBotHandler(socket, message) {
    const reversedContent = message.content.split('').reverse().join('');
    setTimeout(async () => {
      const botMessage: Message = {
        sender: 'Reverse bot',
        receiver: message.sender,
        content: reversedContent,
        sentAt: new Date(),
      };

      await this.messageService.createMessage(botMessage);
      socket.emit('message', botMessage);
    }, 3000);
  }
}
