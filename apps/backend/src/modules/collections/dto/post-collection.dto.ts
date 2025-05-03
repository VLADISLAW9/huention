import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'ID родительской коллекции',
    example: 1,
    required: false
  })
  parentCollectionId: number;
}
