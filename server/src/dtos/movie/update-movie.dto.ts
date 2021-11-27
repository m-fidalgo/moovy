import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import InsertMovieDto from './insert-movie.dto';

export default class UpdateMovieDto {
  @IsString()
  @IsOptional()
  review: string;
}
