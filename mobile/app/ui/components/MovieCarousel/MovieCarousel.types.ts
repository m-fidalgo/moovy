import { MovieInterface } from "../../../data/@types/MovieInterface";

export type MovieCarouselProps = {
  movies: MovieInterface[];
  onRecord: Function;
  onPlay: Function;
  onDelete: Function;
};
