import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { User as _User } from '../user/entities';

class User implements Omit<_User, 'password' | 'salt' | 'validatePassword'> {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  username: string;
}

export class AuthSignInResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;

  @ApiProperty({ description: 'Токен доступа', type: String })
  accessToken: string;
}

export class AuthSignUpResponse extends BaseResponse {
  @ApiProperty({ description: 'Пользователь', type: User })
  user: User;

  @ApiProperty({ description: 'Токен доступа', type: String })
  accessToken: string;
}
