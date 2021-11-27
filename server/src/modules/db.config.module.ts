import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieEntity from 'src/entities/movie.entity';
import ReviewEntity from 'src/entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      autoLoadEntities: true,
      migrations: ['../database/migrations/*.ts'],
      entities: ['../entities/*.ts'],
      cli: {
        migrationsDir: '../database/migrations',
      },
    }),
    TypeOrmModule.forFeature([ReviewEntity, MovieEntity]),
  ],
})
export class DbConfigModule {}
