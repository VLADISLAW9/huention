import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse, PaginationResponse } from '@/shared';

import { User } from './entities';

export class UserResponse implements Omit<User, 'password' | 'salt'> {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  id: number;
}

export class GetUserResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}

export class GetUsersResponse extends PaginationResponse {
  @ApiProperty({ description: 'Список пользователей', type: [UserResponse] })
  users: UserResponse[];
}

export class CreateUserResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}

export class SessionResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}
