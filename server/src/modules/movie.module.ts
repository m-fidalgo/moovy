import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieController from 'src/controllers/movie.controller';
import MovieEntity from 'src/entities/movie.entity';
import MovieService from 'src/services/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export default class MovieModule {}
