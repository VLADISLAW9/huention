import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Filter users by name (case-insensitive)',
    example: 'pikachu',
    required: true
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Filter users by name (case-insensitive)',
    example: 'pikachu',
    required: true
  })
  lastName: string;
}
