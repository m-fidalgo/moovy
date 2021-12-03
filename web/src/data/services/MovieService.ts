import { MovieInterface } from "../@types/MovieInterface";
import { ApiService } from "./ApiService";

const libraryEndpoint = "/library";
const omdbEndpoint = "/omdb";

export const MovieService = {
  getFromLibrary() {
    return ApiService.get<MovieInterface[]>(libraryEndpoint);
  },
  getFromOmdb(text: string) {
    return ApiService.get<MovieInterface[]>(`${omdbEndpoint}/${text}`);
  },
  addToLibrary(movie: MovieInterface) {
    return ApiService.post<MovieInterface>(libraryEndpoint, {
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      imdb_id: movie.imdb_id,
    });
  },
  removeFromLibrary(id: number) {
    return ApiService.delete(`${libraryEndpoint}/${id}`);
  },
};
