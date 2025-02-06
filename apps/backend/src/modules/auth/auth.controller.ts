import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  Res
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { BaseResolver } from '@/shared';

import { User, UsersService } from '../users';
import { AuthSignInResponse, AuthSignUpResponse } from './auth.model';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController extends BaseResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService
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
  async signIn(@Res({ passthrough: true }) signInRes, @Body() authSignInDto: AuthSignInDto) {
    const user = await this.usersService.findOne({ where: { email: authSignInDto.email } });

    if (!user) {
      throw new BadRequestException(this.wrapFail('Не правильно введен email или пароль'));
    }

    const validatePassword = await this.authService.validatePassword(
      authSignInDto.password,
      user.password
    );

    if (!validatePassword) {
      throw new BadRequestException(this.wrapFail('Не правильно введен email или пароль'));
    }

    const accessToken = this.jwtService.sign({ user });
    const authSignInResponse = new AuthSignInResponse();

    authSignInResponse.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    };

    signInRes.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'strict'
    });

    return this.wrapSuccess({ user });
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Регистрация пользователя прошла успешна',
    type: AuthSignUpResponse
  })
  async signUp(
    @Res({ passthrough: true }) signUpRes: Response,
    @Body() authSignUpDto: AuthSignUpDto
  ) {
    if (authSignUpDto.password !== authSignUpDto.confirmPassword) {
      throw new BadRequestException(this.wrapFail('Пароли не совпадают'));
    }

    const userExists = await this.usersService.findOne({ where: { email: authSignUpDto.email } });

    if (userExists) {
      throw new ConflictException(this.wrapFail('Пользователь с таким email уже существует'));
    }

    const user = new User();

    const salt = await this.authService.generateSalt();
    const hashPassword = await this.authService.hashPassword(authSignUpDto.password, salt);

    user.email = authSignUpDto.email;
    user.firstName = authSignUpDto.firstName;
    user.lastName = authSignUpDto.lastName;
    user.username = authSignUpDto.username;
    user.password = hashPassword;
    user.salt = salt;

    const savedUser = await this.usersService.save(user);
    const accessToken = this.jwtService.sign({ user: savedUser });

    const authSignUpResponse = new AuthSignUpResponse();

    authSignUpResponse.user = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      username: savedUser.username
    };

    signUpRes.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'strict'
    });

    return this.wrapSuccess({ user });
  }
}
