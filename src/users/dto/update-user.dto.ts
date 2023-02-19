import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  friends: string;
}
