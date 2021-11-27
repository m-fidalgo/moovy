import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieEntity from 'src/entities/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
      migrations: ['../database/migrations/*.ts'],
      entities: ['../entities/*.ts'],
      cli: {
        migrationsDir: '../database/migrations',
      },
    }),
    TypeOrmModule.forFeature([MovieEntity]),
  ],
})
export class DbConfigModule {}
