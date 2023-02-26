import { Model, ObjectId, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private chatsService: ChatsService,
  ) {}

  async create(createGroupDto: CreateGroupDto, owner: UserDocument) {
    const chat = await this.chatsService.createChart({
      members: [owner._id],
    });

    return this.groupModel.create({
      ...createGroupDto,
      participants: [owner],
      owner: owner._id,
      chat: chat._id,
    });
  }

  addParticipant(groupId: Types.ObjectId, userId: Types.ObjectId) {
    return this.groupModel.findByIdAndUpdate(
      groupId,
      {
        $addToSet: { participants: userId },
      },
      {
        returnDocument: 'after',
      },
    );
  }

  deleteParticipant(groupId: ObjectId, userId: ObjectId) {
    return this.groupModel.findByIdAndUpdate(groupId, {
      $pop: { participants: userId },
    });
  }

  search(searchGroupDto: SearchGroupDto) {
    return this.groupModel.find({
      ...searchGroupDto,
      name: { $regex: new RegExp(searchGroupDto.name, 'i') },
    });
  }

  findAll() {
    return this.groupModel.find({});
  }

  findOne(id: ObjectId) {
    return this.groupModel.findById(id);
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
