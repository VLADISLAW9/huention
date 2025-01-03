import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthModule,
  CollectionsModule,
  DocumentsModule,
  ProfileModule,
  UsersModule
} from './modules';

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
    UsersModule,
    AuthModule,
    ProfileModule,
    DocumentsModule,
    CollectionsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
