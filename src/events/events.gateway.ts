import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { UsersService } from 'src/users/users.service';
import { WsJwtGuard } from 'src/guards/jwtWS.guard';
import { UseGuards, Req } from '@nestjs/common';

@WebSocketGateway(3001, {
  cors: true,
})
export class EventsGateway {
  constructor(
    private eventsService: EventsService,
    private usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('groupMessage')
  async createMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { text: string; chatId: number },
    @Req() request: { userId: number },
  ) {
    const { userId } = request;
    const { text, chatId } = data;

    const message = await this.eventsService.createMessage({
      text,
      userId,
      chatId,
    });

    this.server.to(`${chatId}`).emit('groupMessage', message);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('subscribe')
  async subscribeHandler(
    @ConnectedSocket() socket: Socket,
    @Req() request: { userId: number },
    @MessageBody() data: { event: string; chatId: number },
  ) {
    if (data.event === 'groupMessage') socket.join(`${data.chatId}`);
  }
}
