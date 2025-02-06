import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { UserResponse } from '../users';

export class AuthSignInResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}

export class AuthSignUpResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;
}
