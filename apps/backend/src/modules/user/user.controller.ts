import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver, PaginationDto } from '@/shared';

import { GetUserResponse, GetUsersResponse } from './user.model';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('/users')
export class UserController extends BaseResolver {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('')
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    default: 10,
    description: 'Number of users to return per page'
  })
  @ApiQuery({
    name: 'offset',
    required: true,
    type: Number,
    default: 0,
    description: 'Number of users to skip'
  })
  @ApiOperation({ summary: 'Get users list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    type: GetUsersResponse
  })
  async getUsers(@Query() getUsersDto: PaginationDto): Promise<GetUsersResponse> {
    const userQuery = await this.userService.createQueryBuilder('user');

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
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'user id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'user',
    type: GetUserResponse
  })
  async getUser(@Param() getUserDto: { userId: string }): Promise<GetUserResponse> {
    const user = await this.userService.findOne({
      where: { id: Number(getUserDto.userId) }
    });
    return this.wrapSuccess({ user });
  }
}
