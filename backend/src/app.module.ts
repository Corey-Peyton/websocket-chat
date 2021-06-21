import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { WebsocketModule } from './websocket/websocket.module';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';

@Global()
@Module({
  imports: [InfrastructureModule, WebsocketModule],
  controllers: [],
  providers: [AppService, UserService, UserRepository],
  exports: [UserService],
})
export class AppModule {}
