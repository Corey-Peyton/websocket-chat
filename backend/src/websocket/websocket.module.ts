import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [UserModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
