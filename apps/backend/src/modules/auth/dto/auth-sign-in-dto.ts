import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Логин учетной записи',
    example: 'Vlad',
    required: true
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Пароль учетной записи',
    example: '1234qwerty',
    required: true
  })
  password: string;
}
