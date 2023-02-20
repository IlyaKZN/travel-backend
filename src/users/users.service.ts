import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/utils-functions';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const password = hashPassword(createUserDto.password);
    return this.userModel.create({
      ...createUserDto,
      password,
    });
  }

  findAll() {
    return this.userModel.find({});
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
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
