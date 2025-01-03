import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@/shared';

import { Collection } from './entities';

@Injectable()
export class CollectionsService extends BaseService<Collection> {
  constructor(
    @InjectRepository(Collection)
    private readonly CollectionsRepository: Repository<Collection>
  ) {
    super(CollectionsRepository);
  }
}
