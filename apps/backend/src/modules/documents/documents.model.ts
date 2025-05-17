import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { Document } from './entities';

export class GetDocumentResponse extends BaseResponse {
  @ApiProperty({ description: 'Документ', type: Document })
  document: Document;
}

export class GetDocumentsResponse extends BaseResponse {
  @ApiProperty({ description: 'Документы пользователя ', type: [Document] })
  documents: Document[];
}

export class PostDocumentResponse extends BaseResponse {
  @ApiProperty({ description: 'Документ', type: Document })
  document: Document;
}
