import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateIf } from 'class-validator';

export class PostDocumentDto {
  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  @ApiProperty({
    description: 'Id документа-родителя',
    example: 1,
    required: true
  })
  parentDocumentId: number | null;
}
