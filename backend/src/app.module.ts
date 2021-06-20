import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [InfrastructureModule, WebsocketModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
