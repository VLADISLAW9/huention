import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { User } from './entities';

export class UserResponse extends BaseResponse {
  @ApiProperty({ description: 'User', type: User })
  user: User;
}

export class UsersResponse extends BaseResponse {
  @ApiProperty({ description: 'User', type: [User] })
  users: User[];
}
