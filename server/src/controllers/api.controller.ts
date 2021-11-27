import { Controller, Get, Param } from '@nestjs/common';
import InsertMovieDto from 'src/dtos/movie/insert-movie.dto';
import ApiService from 'src/services/api.service';

@Controller('omdb')
export default class ApiController {
  constructor(private apiService: ApiService) {}

  @Get()
  async get() {
    return 'e';
  }

  @Get(':title')
  async getByTitle(@Param('title') title: string): Promise<InsertMovieDto[]> {
    return this.apiService.getByTitle(title);
  }
}
