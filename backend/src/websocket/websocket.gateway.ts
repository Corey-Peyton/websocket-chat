import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  echoMessage(@MessageBody() data: any) {
    console.log('Data:', data);
    return data;
  }

  handleConnection(client: Socket) {
    console.log(`Client id: ${client.id}`);
  }
}
