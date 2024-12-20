import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from '../user';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const jwtOptions: JwtModuleOptions = {
  secret: 'hjhdgduejghgshgss',
  signOptions: {
    expiresIn: 3600
  }
};

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtOptions)
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
