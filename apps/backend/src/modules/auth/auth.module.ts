import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from '../user';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

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
  providers: [UserService],
  controllers: [AuthController]
})
export class AuthModule {}
