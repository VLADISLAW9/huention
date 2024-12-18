import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse, PaginationResponse } from '@/shared';

import { User } from './entities';

export class GetUserResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;
}

export class GetUsersResponse extends PaginationResponse {
  @ApiProperty({ description: 'Список пользователей', type: [User] })
  users: User[];
}

export class CreateUserResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;
}
