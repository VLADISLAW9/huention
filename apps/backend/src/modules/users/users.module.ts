import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersModule],
  providers: [UsersService]
})
export class UsersModule {}
