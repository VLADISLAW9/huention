import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  AuthModule,
  CollectionsModule,
  DocumentsModule,
  ProfileModule,
  UsersModule
} from './modules';

const TYPE_ORM_MODULE_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '1234',
  database: 'huention',
  entities: ['dist/**/*.entity.js'],
  synchronize: true
};

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPE_ORM_MODULE_OPTIONS),
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
