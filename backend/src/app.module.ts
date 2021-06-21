import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UserModule } from './user/user.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [WebsocketModule, InfrastructureModule, UserModule],
})
export class AppModule {}
