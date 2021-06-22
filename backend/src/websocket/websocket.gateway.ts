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
  handleMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    this.websocketService.onMessage(client, message, this.sendTo.bind(this));
  }

  @SubscribeMessage('botmessage')
  handleBotMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    this.websocketService.handleBotMessage(
      client,
      message,
      this.sendTo.bind(this),
    );
  }

  handleConnection(client: Socket) {
    this.websocketService.onConnect(client, this.sendTo.bind(this));
  }

  handleDisconnect(client: Socket) {
    this.websocketService.onDisconnect(client);
  }

  private sendTo(connections: string[], event: string, message: any): void {
    for (const connection of connections) {
      this.server.to(connection).emit(event, message);
    }
  }
}
