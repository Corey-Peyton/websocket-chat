import { Injectable } from '@nestjs/common';
import { Message } from 'src/message/dto/Message';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { IBot } from './interfaces/IBot';
import { bots } from './bots';
import { UtilityService } from 'src/infrastructure/utility.service';

@Injectable()
export class BotService {
  // Bots were hardcoded because of no need to query them for every user
  private _bots: IBot[] = bots;
  // Map with callbacks to disable spam bot after user disconnect
  private _spamBotDisablers: Map<string, () => void> = new Map();

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly utilityService: UtilityService,
  ) {}

  getBots() {
    return this._bots;
  }

  async handleBotMessage(
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    this.messageService.createMessage(message);

    switch (message.receiver) {
      case 'Echo bot':
        await this.echoBotHandler(message, sendTo);
        break;
      case 'Reverse bot':
        this.reverseBotHandler(message, sendTo);
        break;
    }
  }

  private async echoBotHandler(
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    const receiverConnections =
      await this.userService.findUserConnectionsByUsername(message.sender);

    const botMessage: Message = {
      sender: 'Echo bot',
      receiver: message.sender,
      content: message.content,
      sentAt: new Date(),
    };

    await this.messageService.createMessage(botMessage);
    sendTo(receiverConnections, 'message', botMessage);
  }

  private reverseBotHandler(
    message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    const reversedContent = message.content.split('').reverse().join('');
    setTimeout(async () => {
      const receiverConnections =
        await this.userService.findUserConnectionsByUsername(message.sender);
      const botMessage: Message = {
        sender: 'Reverse bot',
        receiver: message.sender,
        content: reversedContent,
        sentAt: new Date(),
      };

      await this.messageService.createMessage(botMessage);
      sendTo(receiverConnections, 'message', botMessage);
    }, 3000);
  }

  async spamBotHandler(
    sendTo: (connections: string[], event: string, message: any) => void,
    username: string,
  ) {
    // Disabled spam bot flag
    let disabled = false;
    const messageContent = 'Hello from Spam bot!';

    // Interval clojure
    const interval = () => {
      const timeout = this.utilityService.generateRandom(10, 120) * 1000;
      setTimeout(async () => {
        if (disabled) return;
        const connections =
          await this.userService.findUserConnectionsByUsername(username);

        const botMessage: Message = {
          sender: 'Spam bot',
          receiver: username,
          content: messageContent,
          sentAt: new Date(),
        };

        await this.messageService.createMessage(botMessage);
        sendTo(connections, 'message', botMessage);
        interval();
      }, timeout);
    };

    interval();

    // Disabler function will be called on user disconnect
    function disabler() {
      disabled = true;
    }
    this._spamBotDisablers.set(username, disabler);
  }

  disableSpamBot(username: string): void {
    this._spamBotDisablers.get(username)();
  }
}
