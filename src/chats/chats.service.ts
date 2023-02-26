import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './entities/chat.entity';
import { Message, MessageDocument } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  createChart(createGroupDto: CreateGroupDto) {
    return this.chatModel.create({
      members: createGroupDto.members,
    });
  }

  async createMessage(createUserDto: CreateMessageDto) {
    const { text, userId, chatId } = createUserDto;

    const message = await this.messageModel.create({
      text,
      owner: userId,
    });

    if (message) {
      this.chatModel
        .findByIdAndUpdate(chatId, {
          $push: { messages: message._id },
        })
        .catch((err) => console.log(err));
    }

    return message;
  }
}
