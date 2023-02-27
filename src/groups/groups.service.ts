import { UsersService } from './../users/users.service';
import { ArrayContains, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
// import { UpdateGroupDto } from './dto/update-group.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { ChatsService } from 'src/chats/chats.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private usersService: UsersService,
    private chatsService: ChatsService,
  ) {}

  async create(createGroupDto: CreateGroupDto, owner: User) {
    const chat = await this.chatsService.createChat({
      members: [owner],
    });

    return this.groupRepository.save({
      ...createGroupDto,
      participants: [owner],
      owner,
      chat,
    });
  }

  async addParticipants(groupId: number, userId: number) {
    const group = await this.findOne(groupId);
    const user = await this.usersService.findOne(userId);
    group.participants.push(user);
    this.groupRepository.save(group);
  }

  async deleteMember(groupId: number, userId: number) {
    const group = await this.findOne(groupId);
    group.participants = group.participants.filter(
      (member) => member.id !== userId,
    );
  }

  async search(searchGroupDto: SearchGroupDto) {
    const { searchString, owner } = searchGroupDto;

    return this.groupRepository.find({
      where: [
        { name: Like(`%${searchString}%`), owner: { id: owner } },
        { waypoints: ArrayContains([searchString]), owner: { id: owner } },
      ],
    });
  }

  findAll() {
    return this.groupRepository.find({});
  }

  findOne(id: number) {
    return this.groupRepository.findOne({
      where: {
        id,
      },
      loadRelationIds: true,
    });
  }
}
