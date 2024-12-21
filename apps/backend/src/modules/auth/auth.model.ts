import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { UserResponse } from '../user/user.model';

export class AuthSignInResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;

  @ApiProperty({ description: 'Токен доступа', type: String })
  accessToken: string;
}

export class AuthSignUpResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: UserResponse })
  user: UserResponse;

  @ApiProperty({ description: 'Токен доступа', type: String })
  accessToken: string;
}
