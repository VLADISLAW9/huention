import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { BaseResolver } from '@/shared';

import { UserService } from '../user';
import { User } from '../user/entities';
import { AuthSignInResponse, AuthSignUpResponse } from './auth.model';
import { AuthSignInDto } from './dto/auth-sign-in-dto';
import { AuthSignUpDto } from './dto/auth-sign-up-dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController extends BaseResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
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
    const user = await this.userService.findOne({ where: { email: authSignInDto.email } });

    if (!user) {
      throw new BadRequestException(this.wrapFail('Не правильно введен email или пароль'));
    }

    const hashPassword = await bcrypt.hash(authSignInDto.password, user.salt);

    if (hashPassword !== user.password) {
      throw new BadRequestException(this.wrapFail('Не правильно введен email или пароль'));
    }

    const accessToken = this.jwtService.sign({ user });
    const authSignInResponse = new AuthSignInResponse();

    authSignInResponse.accessToken = accessToken;
    authSignInResponse.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    };

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
    if (authSignUpDto.password !== authSignUpDto.confirmPassword) {
      throw new BadRequestException(this.wrapFail('Пароли не совпадают'));
    }

    const userExists = await this.userService.findOne({ where: { email: authSignUpDto.email } });

    if (userExists) {
      throw new ConflictException(this.wrapFail('Пользователь с таким email уже существует'));
    }

    const user = new User();

    user.email = authSignUpDto.email;
    user.firstName = authSignUpDto.firstName;
    user.lastName = authSignUpDto.lastName;
    user.username = authSignUpDto.username;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(authSignUpDto.password, user.salt);

    const savedUser = await this.userService.save(user);
    const accessToken = this.jwtService.sign({ user: savedUser });

    const authSignUpResponse = new AuthSignUpResponse();

    authSignUpResponse.accessToken = accessToken;
    authSignUpResponse.user = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      username: savedUser.username
    };

    return this.wrapSuccess({ user, accessToken });
  }
}
