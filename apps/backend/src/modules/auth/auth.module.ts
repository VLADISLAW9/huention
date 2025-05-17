import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiAuthGuard } from '@/shared';

import { UsersModule, UsersService } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1d' }
    })
  ],
  exports: [AuthModule, AuthService],
  providers: [UsersService, AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
