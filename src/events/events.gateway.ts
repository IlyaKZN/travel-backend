import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsService } from './events.service';
import { UsersService } from 'src/users/users.service';
import { WsJwtGuard } from 'src/guards/jwtWS.guard';
import { UseGuards, Req } from '@nestjs/common';
import mongoose from 'mongoose';

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
  @SubscribeMessage('message')
  async createMessage(
    socket: any,
    @MessageBody() data: { text: string; chatId: string },
    @Req() request: { userId: string },
  ) {
    const id = new mongoose.Types.ObjectId(request.userId);
    const user = await this.usersService.findOne(id);

    const message = await this.eventsService.createMessage({
      text: data.text,
      userId: user._id,
      chatId: data.chatId,
    });

    this.server.send('message', message);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  onModuleInit() {
    this.server.emit('message', 'test');
  }
}
