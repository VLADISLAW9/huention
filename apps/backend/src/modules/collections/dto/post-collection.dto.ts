import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostCollectionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Имя коллекции',
    example: 'Личное',
    required: true
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Описание коллекции',
    example: '1234qwerty',
    required: false
  })
  description: string;
}
