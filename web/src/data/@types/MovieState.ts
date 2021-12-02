import { MovieInterface } from "./MovieInterface";

export type MovieState = {
  movies: MovieInterface[];
  error: string;
};
