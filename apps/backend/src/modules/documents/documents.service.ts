import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@/shared';

import { PostDocumentDto } from './dto';
import { Document } from './entities';

@Injectable()
export class DocumentsService extends BaseService<Document> {
  constructor(
    @InjectRepository(Document)
    private readonly DocumentsRepository: Repository<Document>
  ) {
    super(DocumentsRepository);
  }

  async createDocument({ creatorId, parentDocumentId }: PostDocumentDto & { creatorId: number }) {
    const document = this.DocumentsRepository.create({
      body: '',
      creatorId,
      description: '',
      name: 'Без названия',
      parentDocumentId
    });
    return this.DocumentsRepository.save(document);
  }

  async getDocuments(): Promise<Document[]> {
    return this.DocumentsRepository.find({ relations: ['childrenDocuments'] });
  }

  async getDocument(id: number): Promise<Document> {
    return this.DocumentsRepository.findOne({ where: { id }, relations: ['childrenDocuments`'] });
  }
}
