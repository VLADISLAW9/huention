import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule, AuthService, UserModule, UserService } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'huention',
      entities: ['dist/**/*.entity.js'],
      synchronize: true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
