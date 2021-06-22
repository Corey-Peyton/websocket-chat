import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { BotService } from './bot.service';

@Module({
  imports: [MessageModule, UserModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
