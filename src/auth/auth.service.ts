import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Types } from 'mongoose';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  auth(user: User & { _id: Types.ObjectId }) {
    const payload = { sub: user._id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isPasswordsMatched = await compare(password, user.password);

    // if (!isPasswordsMathced) {
    //   throw new BadRequestException('Неправильный логин или пароль');
    // }

    if (user && isPasswordsMatched) {
      delete user.password;
      return user;
    }

    return null;
  }
}
