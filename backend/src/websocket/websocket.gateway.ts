import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/message/dto/Message';
import { WebsocketService } from './websocket.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message) {
    this.websocketService.onMessage(this.server, message);
  }

  @SubscribeMessage('botmessage')
  handleBotMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    this.websocketService.handleBotMessage(client, message);
  }

  handleConnection(client: Socket) {
    this.websocketService.onConnect(client);
  }

  handleDisconnect(client: Socket) {
    this.websocketService.onDisconnect(client);
  }
}
