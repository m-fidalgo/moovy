import { MovieInterface } from "./MovieInterface";

export interface UnsynchedMovieInterface {
  movie: MovieInterface;
  review: string | null;
}
