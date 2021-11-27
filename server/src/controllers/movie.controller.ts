import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import InsertMovieDto from 'src/dtos/movie/insert-movie.dto';
import UpdateMovieDto from 'src/dtos/movie/update-movie.dto';
import MovieEntity from 'src/entities/movie.entity';
import MovieService from 'src/services/movie.service';

@Controller('library')
export default class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAll(): Promise<MovieEntity[]> {
    return this.movieService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<MovieEntity> {
    return this.movieService.getOne(id);
  }

  @Post()
  async insert(@Body() movieDto: InsertMovieDto): Promise<MovieEntity> {
    return this.movieService.insert(movieDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() movieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.movieService.update(id, movieDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.movieService.delete(id);
  }
}
