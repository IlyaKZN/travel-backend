import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { UsersModule } from 'src/users/users.module';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  providers: [EventsGateway, EventsService],
  imports: [UsersModule, ChatsModule],
})
export class EventsModule {}
