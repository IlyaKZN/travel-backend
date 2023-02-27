import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  createChat(createGroupDto: CreateGroupDto) {
    return this.chatRepository.save({
      members: [...createGroupDto.members],
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

  findOne(id: number, user: User) {
    console.log(id, user);

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
}
