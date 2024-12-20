import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { AuthSignInResponse, AuthSignUpResponse } from './auth.model';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-sign-in-dto';
import { AuthSignUpDto } from './dto/auth-sign-up-dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController extends BaseResolver {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Авторизация пользователя прошла успешна',
    type: AuthSignInResponse
  })
  async signIn(@Body() authSignInDto: AuthSignInDto) {
    const { accessToken, user } = await this.authService.signIn(authSignInDto);

    if (!user && !accessToken) {
      return this.wrapFail('Неверные email или пароль');
    }

    return this.wrapSuccess({ user, accessToken });
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Регистрация пользователя прошла успешна',
    type: AuthSignUpResponse
  })
  async signUp(@Body() authSignUpDto: AuthSignUpDto) {
    const { accessToken, user } = await this.authService.signUp(authSignUpDto);
    return this.wrapSuccess({ user, accessToken });
  }
}
