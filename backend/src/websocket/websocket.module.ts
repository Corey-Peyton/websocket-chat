import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [UserModule, MessageModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
