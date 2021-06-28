import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { BotService } from './bot.service';
import { EchoBotHandler } from './bots/echoBot.service';
import { ReverseBotHandler } from './bots/reverseBot.service';
import { SpamBotHandler } from './bots/spamBot.service';

@Module({
  imports: [MessageModule, UserModule],
  providers: [EchoBotHandler, ReverseBotHandler, SpamBotHandler, BotService],
  exports: [BotService],
})
export class BotModule {}
