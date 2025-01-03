import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PatchDocumentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Имя документа',
    example: 1,
    required: false
  })
  name: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Описание документа',
    example: 1,
    required: false
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: ' Тело документа',
    example: 1,
    required: false
  })
  body: string;
}
