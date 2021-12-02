import { MovieInterface } from "./MovieInterface";
import { UnsynchedMovieInterface } from "./UnsynchedMovieInterface";

export type MovieState = {
  movies: MovieInterface[];
  unsynchedMovies: UnsynchedMovieInterface[];
};
