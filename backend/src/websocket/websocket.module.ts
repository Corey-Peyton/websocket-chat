import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [UserModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
