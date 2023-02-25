import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req) {
    const { access_token: accessToken } = this.authService.auth(req.user);
    const { ...rest } = req.user;

    delete rest._doc.password;

    return {
      accessToken,
      user: rest._doc,
    };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    const accessToken = this.authService.auth(user);

    return {
      accessToken,
      user,
    };
  }
}
