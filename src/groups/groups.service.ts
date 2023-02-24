import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  create(createGroupDto: CreateGroupDto, owner: User) {
    return this.groupModel.create({
      ...createGroupDto,
      participants: [owner],
      owner,
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
    return this.groupModel.findById(id).populate('owner');
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
