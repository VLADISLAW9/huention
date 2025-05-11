import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { UsersService } from './users.service';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersModule],
  providers: [UsersService]
})
export class UsersModule {}
