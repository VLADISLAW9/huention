import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule, UsersService } from '../users';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { Collection } from './entities';

@Module({
  controllers: [CollectionsController],
  imports: [TypeOrmModule.forFeature([Collection]), UsersModule],
  exports: [TypeOrmModule, CollectionsModule],
  providers: [CollectionsService, UsersService]
})
export class CollectionsModule {}
