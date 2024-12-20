import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Никнейм пользователя',
    example: 'Vladik2k',
    required: true
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Почта пользователя',
    example: 'vlad@gmail.com',
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Подтверждение пароля учетной записи',
    example: '1234qwerty',
    required: true
  })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Имя пользователя',
    example: '1234qwerty',
    required: true
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Фамилия пользователя',
    example: '1234qwerty',
    required: true
  })
  lastName: string;
}
