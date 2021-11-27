import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export default class InsertMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  poster: string;

  @IsDecimal()
  @IsNotEmpty()
  rating: number;
}
