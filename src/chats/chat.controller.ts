import { User } from 'src/users/entities/user.entity';
import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: { user: User }) {
    console.log('test');

    return this.chatsService.findOne(id, req.user);
  }
}
