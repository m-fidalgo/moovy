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
};
