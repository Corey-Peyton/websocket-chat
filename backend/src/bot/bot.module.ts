import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { BotService } from './bot.service';

@Module({
  imports: [MessageModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
