import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDocumentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id коллекции документа',
    example: 1,
    required: true
  })
  collectionId: number;
}
