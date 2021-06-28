import { Injectable } from '@nestjs/common';
import { Message } from 'src/message/dto/Message';
import { IBot } from './interfaces/IBot';
import { bots } from './bots';
import { botTypes } from './types/botTypes';
import { EchoBotHandler } from './bots/echoBot.service';
import { ReverseBotHandler } from './bots/reverseBot.service';
import { SpamBotHandler } from './bots/spamBot.service';

@Injectable()
export class BotService {
  // Bots were hardcoded because of no need to query them for every user
  private _bots: IBot[] = bots;

  constructor(
    private readonly echoBotHandler: EchoBotHandler,
    private readonly reverseBotHandler: ReverseBotHandler,
    private readonly spamBotHandler: SpamBotHandler,
  ) {}

  getBots() {
    return this._bots;
  }

  async handleMessage(
    message: Message,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    switch (message.receiver) {
      case botTypes.echoBot:
        await this.echoBotHandler.handleMessage(message, sendTo);
        break;
      case botTypes.reverseBot:
        this.reverseBotHandler.handleMessage(message, sendTo);
        break;
    }
  }

  startSpamBot(
    username: string,
    sendTo: (connections: string[], event: string, message: any) => void,
  ) {
    this.spamBotHandler.start(username, sendTo);
  }

  disableSpamBot(username: string) {
    this.spamBotHandler.disable(username);
  }
}
