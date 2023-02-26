import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ChatsService } from 'src/chats/chats.service';
import { Types } from 'mongoose';

@Injectable()
export class EventsService {
  @Inject(ChatsService)
  private readonly chatsService: ChatsService;

  createMessage(payload: {
    userId: Types.ObjectId;
    text: string;
    chatId: string;
  }) {
    return this.chatsService.createMessage({
      text: payload.text,
      userId: payload.userId,
      chatId: payload.chatId,
    });
  }
}
