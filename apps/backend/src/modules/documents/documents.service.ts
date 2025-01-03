import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@/shared';

import { CollectionsService } from '../collections/collections.service';
import { PostDocumentDto } from './dto';
import { Document } from './entities';

@Injectable()
export class DocumentsService extends BaseService<Document> {
  constructor(
    @InjectRepository(Document)
    private readonly DocumentsRepository: Repository<Document>,
    private readonly collectionsService: CollectionsService
  ) {
    super(DocumentsRepository);
  }

  async createDocument({ collectionId, creatorId }: PostDocumentDto & { creatorId: number }) {
    const collection = await this.collectionsService.getCollectionById(collectionId);

    const document = this.DocumentsRepository.create({
      body: '',
      creatorId,
      description: '',
      name: 'Без названия',
      collection
    });
    return this.DocumentsRepository.save(document);
  }

  async getDocuments(): Promise<Document[]> {
    return this.DocumentsRepository.find({ relations: ['collection'] });
  }

  async getDocumentById(id: number): Promise<Document> {
    return this.DocumentsRepository.findOne({ where: { id }, relations: ['documents'] });
  }
}
