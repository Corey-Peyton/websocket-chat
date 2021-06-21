import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  echoMessage(@MessageBody() data: any) {
    console.log('Data:', data);
    return data;
  }

  handleConnection(client: Socket) {
    this.websocketService.onConnect(client);
  }

  handleDisconnect(client: Socket) {
    this.websocketService.onDisconnect(client);
  }
}
