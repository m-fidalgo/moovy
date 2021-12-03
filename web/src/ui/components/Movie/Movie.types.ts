import { MovieInterface } from "../../../data/@types/MovieInterface";

export type MovieProps = {
  movie: MovieInterface;
  onAdd: Function;
  onRemove: Function;
};
