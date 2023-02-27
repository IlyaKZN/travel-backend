import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class EventsService {
  @Inject(ChatsService)
  private readonly chatsService: ChatsService;

  createMessage(payload: { userId: number; text: string; chatId: number }) {
    return this.chatsService.createMessage({
      text: payload.text,
      userId: payload.userId,
      chatId: payload.chatId,
    });
  }
}
