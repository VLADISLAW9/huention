import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateIf } from 'class-validator';

export class GetDocumentDto {
  @IsNumber()
  @ApiProperty({
    description: 'Id документа',
    example: 1,
    required: true
  })
  id: number;
}
