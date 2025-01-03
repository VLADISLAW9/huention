import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiAuthorizedOnly, BaseResolver } from '@/shared';

import { AuthService } from '../auth';
import { User, UserResponse, UsersService } from '../users';
import { GetProfileResponse } from './profile.model';

@ApiTags('Profile')
@Controller('/profile')
export class ProfileController extends BaseResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
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
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    const token = request.headers.authorization.split(' ')[1];

    const decodedJwtAccessToken = (await this.authService.decode(token)) as { user: User };

    const _user = await this.usersService.findOne({
      where: { id: decodedJwtAccessToken.user.id }
    });

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
