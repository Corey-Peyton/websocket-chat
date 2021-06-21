import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  echoMessage(@MessageBody() data: any) {
    console.log('Data:', data);
    return data;
  }

  handleConnection(client: Socket) {
    const user = this.userService.createUser();
    console.log(user);
  }
}
