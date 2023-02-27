import { ChatsController } from './chat.controller';
import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), UsersModule],
  providers: [ChatsService],
  exports: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
