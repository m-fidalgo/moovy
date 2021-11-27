import axios from 'axios';
import { Injectable } from '@nestjs/common';
import ApiDto from 'src/dtos/api/api.dto';
import InsertMovieDto from 'src/dtos/movie/insert-movie.dto';

const baseURL = `http://www.omdbapi.com`;
const api = axios.create({
  baseURL,
});

@Injectable()
export default class ApiService {
  mapToMovieDto(omdbMovies: ApiDto[]): InsertMovieDto[] {
    const movies: InsertMovieDto[] = [];

    omdbMovies.forEach((omdb) => {
      movies.push({
        title: omdb.Title,
        imdb_id: omdb.imdbID,
        poster: omdb.Poster,
        year: parseInt(omdb.Year),
      });
    });

    return movies;
  }

  getByTitle(title: string): Promise<InsertMovieDto[]> {
    return api
      .get(`?apikey=${process.env.API_KEY}&type=movie&s=${title}`)
      .then((resp) => resp.data['Search'])
      .then((ombdMovies: ApiDto[]) => {
        const movies = this.mapToMovieDto(ombdMovies);
        return movies;
      });
  }
}
