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

  async getCollections(): Promise<Collection[]> {
    return this.CollectionsRepository.find({ relations: ['documents'] });
  }

  async createCollection(name: string): Promise<Collection> {
    const collection = this.CollectionsRepository.create({ name });
    return this.CollectionsRepository.save(collection);
  }

  async getCollectionById(id: number): Promise<Collection> {
    return this.CollectionsRepository.findOne({ where: { id }, relations: ['documents'] });
  }
}
