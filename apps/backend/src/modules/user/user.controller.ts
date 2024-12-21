import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { GetUsersDto } from './dto';
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
    const user = await this.userService.findOne({
      where: { id: Number(getUserDto.userId) }
    });

    if (!user) {
      throw new NotFoundException(this.wrapFail('Пользователь не найден'));
    }

    return this.wrapSuccess({ user });
  }
}
