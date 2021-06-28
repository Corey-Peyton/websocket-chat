import { Injectable } from '@nestjs/common';
import { UtilityService } from 'src/infrastructure/utility.service';
import { Message } from 'src/message/dto/Message';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { botTypes } from '../types/botTypes';

@Injectable()
export class SpamBotHandler {
  private _disablers: Map<string, () => void> = new Map();

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly utilityService: UtilityService,
  ) {}

  public async start(
    username: string,
    sendTo: (connections: string[], event: string, message: any) => void,
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
          sender: botTypes.spamBot,
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
    this._disablers.set(username, disabler);
  }

  disable(username: string) {
    this._disablers.get(username)();
  }
}
