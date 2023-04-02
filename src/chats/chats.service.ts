import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, IsNull, Equal } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { FindChatDto } from './dto/find-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    const users = await this.usersService.findMany(createChatDto.members);

    return this.chatRepository.save({
      members: users,
    });
  }

  async createMessage(createUserDto: CreateMessageDto) {
    const { text, userId, chatId } = createUserDto;

    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
    });

    const owner = await this.usersService.findOne(userId);

    return this.messageRepository.save({
      text,
      owner,
      chat,
    });
  }

  findById(id: number, user: User) {
    return this.chatRepository.findOne({
      where: {
        id,
        members: [{ id: user.id }],
      },
      relations: {
        messages: true,
        members: true,
      },
    });
  }

  async findOne(findChatDto: FindChatDto) {
    if (findChatDto.type === 'dialog') {
      const chats = await this.chatRepository.find({
        relations: {
          members: true,
        },
        where: {
          members: {
            id: In(findChatDto.members),
          },
          group: IsNull(),
        },
      });

      return chats.find((chat) =>
        chat.members.find((member) => member.id === findChatDto.members[1]),
      );
    } else {
      return this.chatRepository.findOne({
        where: {
          members: {
            id: In(findChatDto.members),
          },
        },
      });
    }
  }
}
