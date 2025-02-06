import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly, BaseResolver } from '@/shared';

import { UserResponse, UsersService } from '../users';
import { GetProfileResponse } from './profile.model';

@Controller('/profile')
@ApiAuthorizedOnly()
export class ProfileController extends BaseResolver {
  constructor(private usersService: UsersService) {
    super();
  }

  @ApiAuthorizedOnly()
  @Get('')
  @ApiOperation({ summary: 'получить сессию пользователя' })
  @ApiResponse({
    status: 200,
    description: 'session',
    type: GetProfileResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getProfile(@Req() request: Request): Promise<GetProfileResponse> {
    const token = request.cookies.access_token;

    const _user = await this.usersService.getUserByToken(token);

    if (!_user) {
      throw new BadRequestException(this.wrapFail('Пользователь не найден'));
    }

    const user = new UserResponse();

    user.email = _user.email;
    user.firstName = _user.firstName;
    user.lastName = _user.lastName;
    user.username = _user.username;
    user.id = _user.id;

    return this.wrapSuccess({ user, accessToken: token });
  }
}
