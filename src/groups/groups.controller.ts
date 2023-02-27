import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req: { user }) {
    return this.groupsService.create(createGroupDto, req.user);
  }

  @Post('/search')
  search(@Body() searchGroupDto: SearchGroupDto) {
    return this.groupsService.search(searchGroupDto);
  }

  @UseGuards(JwtGuard)
  @Post('/participants')
  addParticipant(
    @Body() addParticipantDto: { groupId: number },
    @Req() req: { user: User },
  ) {
    return this.groupsService.addParticipants(
      addParticipantDto.groupId,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupsService.update(+id, updateGroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(+id);
  // }
}
