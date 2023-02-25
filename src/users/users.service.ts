import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { hashPassword } from 'src/utils/utils-functions';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const password = hashPassword(createUserDto.password);
    return this.userModel.create({
      ...createUserDto,
      password,
    });
  }

  search(searchUserDto: SearchUserDto, ownerId: ObjectId) {
    const { searchValue } = searchUserDto;

    return this.userModel.find({
      $or: [
        {
          firstName: {
            $regex: new RegExp(searchValue, 'i'),
          },
          _id: { $ne: ownerId },
        },
        {
          lastName: { $regex: new RegExp(searchValue, 'i') },
          _id: { $ne: ownerId },
        },
      ],
    });
  }

  findAll(ownerId: ObjectId) {
    return this.userModel.find({
      _id: { $ne: ownerId },
    });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username }).select('+password');
  }

  findOne(id: ObjectId) {
    return this.userModel.findById(id);
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      returnDocument: 'after',
    });
  }

  remove(id: ObjectId) {
    return this.userModel.findByIdAndRemove(id);
  }
}
