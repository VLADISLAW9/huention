import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/shared';

import { Collection } from './entities';

export class GetCollectionsResponse extends BaseResponse {
  @ApiProperty({ description: 'Коллекции', type: [Collection] })
  collections: Collection[];
}

export class PostCollectionResponse extends BaseResponse {
  @ApiProperty({ description: 'Коллекция', type: Collection })
  collection: Collection;
}
