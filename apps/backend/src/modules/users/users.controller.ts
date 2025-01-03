import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { AuthService } from '../auth';
import { GetUsersDto } from './dto';
import { GetUserResponse, GetUsersResponse, SessionResponse } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('/users')
export class UsersController extends BaseResolver {
  constructor(private usersService: UsersService) {
    super();
  }

  @Get('')
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    default: 10,
    description: 'Лимит пользователей'
  })
  @ApiQuery({
    name: 'offset',
    required: true,
    type: Number,
    default: 0,
    description: 'Число пользователей, которое нужно пропустить'
  })
  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    type: GetUsersResponse
  })
  async getUsers(@Query() getUsersDto: GetUsersDto): Promise<GetUsersResponse> {
    const userQuery = await this.usersService.createQueryBuilder('user');

    userQuery.skip(getUsersDto.offset).take(getUsersDto.limit);

    const [users, itemCount] = await userQuery.getManyAndCount();
    const pageCount = Math.ceil(itemCount / getUsersDto.limit);
    const page = Math.floor(getUsersDto.offset / getUsersDto.limit) + 1;
    const prev = page > 1;
    const next = page < pageCount;

    return this.wrapSuccess({
      users,
      offset: getUsersDto.offset,
      limit: getUsersDto.limit,
      itemCount,
      page,
      pageCount,
      prev,
      next
    });
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'id пользователя',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь',
    type: GetUserResponse
  })
  async getUser(@Param() getUserDto: { userId: string }): Promise<GetUserResponse> {
    const user = await this.usersService.findOne({
      where: { id: Number(getUserDto.userId) }
    });

    if (!user) {
      throw new NotFoundException(this.wrapFail('Пользователь не найден'));
    }

    return this.wrapSuccess({ user });
  }
}
