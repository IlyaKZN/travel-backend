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

  /**
   * Стратегия local автоматически достанет email и password из тела запроса
   * Если пароль будет верным, данные пользователя окажутся в объекте req.user
   */
  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req) {
    /* Генерируем для пользователя JWT токен */
    const { access_token: accessToken } = this.authService.auth(req.user);
    const { email, phoneNumber, username, birthDate, _id } = req.user;

    return {
      accessToken,
      user: {
        email,
        phoneNumber,
        username,
        birthDate,
        _id,
      },
    };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    const accessToken = this.authService.auth(user);
    const { email, phoneNumber, username, birthDate, _id } = user;

    return {
      accessToken,
      user: {
        email,
        phoneNumber,
        username,
        birthDate,
        _id,
      },
    };
  }
}
