import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/users/entities/user.entity';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { FindChatDto } from './dto/find-chat.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  findById(@Param('id') id: number, @Req() req: { user: User }) {
    return this.chatsService.findById(id, req.user);
  }

  @UseGuards(JwtGuard)
  @Post()
  createChat(@Req() req: { user: User }, @Body() createChatDto: CreateChatDto) {
    if (!createChatDto.members.includes(req.user.id)) return;

    return this.chatsService.createChat(createChatDto);
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  findOne(@Req() req: { user: User }, @Body() findChatDto: FindChatDto) {
    if (!findChatDto.members.includes(req.user.id)) return;

    return this.chatsService.findOne(findChatDto);
  }
}
