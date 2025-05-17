import { Module } from '@nestjs/common';

import { ApiAuthGuard } from '@/shared';

import { AuthModule, AuthService } from '../auth';
import { UsersModule, UsersService } from '../users';
import { ProfileController } from './profile.controller';

@Module({
  imports: [UsersModule, AuthModule],
  exports: [ProfileModule],
  providers: [UsersService, AuthService],
  controllers: [ProfileController]
})
export class ProfileModule {}
