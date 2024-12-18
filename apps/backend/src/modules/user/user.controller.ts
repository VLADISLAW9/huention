import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/shared';

import { CreateUserDto } from './dto/create-user-dto';
import { UserResponse, UsersResponse } from './user.model';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('/users')
export class UserController extends BaseResolver {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('')
  @ApiOperation({ summary: 'get user' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'user id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'user',
    type: UsersResponse
  })
  async getUsers(): Promise<UsersResponse> {
    const users = await this.userService.findAll();
    return this.wrapSuccess({ users });
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'get user' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'user id',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'user',
    type: UserResponse
  })
  async getUser(@Param() getUserDto: { userId: string }): Promise<UserResponse> {
    const user = await this.userService.findOne({
      where: { id: Number(getUserDto.userId) }
    });
    return this.wrapSuccess({ user });
  }

  @Post('')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 200,
    description: 'user',
    type: UserResponse
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    console.log(createUserDto);
    const user = await this.userService.save(createUserDto);
    return this.wrapSuccess({ user });
  }
}
