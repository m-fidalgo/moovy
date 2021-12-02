import { MovieInterface } from "./MovieInterface";

export type UnsynchedMovieInterface = {
  movie: MovieInterface;
  review: string | null;
};
