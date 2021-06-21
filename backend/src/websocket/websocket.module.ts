import { Module } from '@nestjs/common';
import { BotModule } from 'src/bot/bot.module';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [UserModule, BotModule, MessageModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
