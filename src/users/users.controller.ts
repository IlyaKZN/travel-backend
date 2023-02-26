import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from './entities/user.entity';
import { ObjectId, Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  findMe(@Req() req: { user }) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Post('/search')
  search(
    @Body() searchUserDto: SearchUserDto,
    @Req() req: { user: User & { _id: ObjectId } },
  ) {
    return this.usersService.search(searchUserDto, req.user._id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: { user: User & { _id: ObjectId } }) {
    return this.usersService.findAll(req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  update(
    @Req() req: { user: User & { _id: ObjectId } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user._id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }

  // @UseGuards(JwtGuard)
  // @Patch('/subscribe')
  // subscribe(
  //   @Req() req: { user: User & { _id: ObjectId } },
  //   @Body() subscribeUserDto: SubscribeUserDto,
  // ) {
  //   return this.usersService.update(req.user._id, {
  //     subscriptions: [subscribeUserDto.]
  //   })
  // }
}
