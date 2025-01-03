import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionsModule, CollectionsService } from '../collections';
import { UsersModule, UsersService } from '../users';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { Document } from './entities';

@Module({
  controllers: [DocumentsController],
  imports: [TypeOrmModule.forFeature([Document]), UsersModule, CollectionsModule],
  exports: [TypeOrmModule, DocumentsModule],
  providers: [DocumentsService, UsersService, CollectionsService]
})
export class DocumentsModule {}
