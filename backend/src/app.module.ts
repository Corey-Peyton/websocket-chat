import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UserModule } from './user/user.module';
import { WebsocketModule } from './websocket/websocket.module';
import { MessageModule } from './message/message.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    WebsocketModule,
    InfrastructureModule,
    UserModule,
    MessageModule,
    BotModule,
  ],
})
export class AppModule {}
