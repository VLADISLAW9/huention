import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  AuthModule,
  CollectionsModule,
  DocumentsModule,
  ProfileModule,
  UsersModule
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity.js'],
        synchronize: configService.get<string>('MODE') === 'dev'
      })
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
