import { PartialType } from '@nestjs/mapped-types';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  friends: string;
  country: string;
  city: string;
  status: string;
  subscriptions: ObjectId[];
}
