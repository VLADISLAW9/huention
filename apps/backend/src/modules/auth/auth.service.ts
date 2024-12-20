import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user';
import { User } from '../user/entities';
import { AuthSignInResponse, AuthSignUpResponse } from './auth.model';
import { AuthSignInDto, AuthSignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthSignInResponse> {
    const user = await this.userService.findOne({ where: { email: authSignInDto.email } });

    const hashPassword = await bcrypt.hash(authSignInDto.password, user.salt);

    if (user && hashPassword === user.password) {
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

      return authSignInResponse;
    }

    return null;
  }

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AuthSignUpResponse> {
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

    return authSignUpResponse;
  }
}
