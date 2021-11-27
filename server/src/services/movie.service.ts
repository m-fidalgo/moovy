import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MovieEntity from 'src/entities/movie.entity';
import InsertMovieDto from 'src/dtos/movie/insert-movie.dto';
import UpdateMovieDto from 'src/dtos/movie/update-movie.dto';

@Injectable()
export default class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly repository: Repository<MovieEntity>,
  ) {}

  getAll(): Promise<MovieEntity[]> {
    return this.repository.find();
  }

  getOne(id: number): Promise<MovieEntity> {
    return this.repository.findOne(id);
  }

  insert(movieDto: InsertMovieDto): Promise<MovieEntity> {
    const movie = this.repository.create(movieDto);
    return this.repository.save(movie);
  }

  async update(id: number, movieDto: UpdateMovieDto): Promise<MovieEntity> {
    const movie = await this.getOne(id);
    if (!movie) throw new NotFoundException(`Movie ${id} not found`);

    movie.review = movieDto.review;

    return this.repository.save(movie);
  }

  async delete(id: number) {
    const movie = await this.repository.findOne(id);
    return this.repository.remove(movie);
  }
}
