import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { WebsocketModule } from './websocket/websocket.module';
import { UserService } from './user/user.service';

@Module({
  imports: [InfrastructureModule, WebsocketModule],
  controllers: [],
  providers: [AppService, UserService],
})
export class AppModule {}
