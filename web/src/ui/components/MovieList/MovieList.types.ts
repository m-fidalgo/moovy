import { MovieInterface } from "../../../data/@types/MovieInterface";

export type MovieListProps = {
  movies: MovieInterface[];
  onAdd: Function;
  onRemove: Function;
};
