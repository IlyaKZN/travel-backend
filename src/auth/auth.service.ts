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

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    const isPasswordsMatched = await compare(password, user.password);

    if (user && isPasswordsMatched) {
      return user;
    }

    return null;
  }
}
