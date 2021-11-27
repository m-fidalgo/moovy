import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export default class InsertMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  imdb_id: string;

  @IsString()
  @IsNotEmpty()
  poster: string;

  @IsInt()
  @IsNotEmpty()
  year: number;
}
