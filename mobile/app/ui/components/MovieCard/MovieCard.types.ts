import { MovieInterface } from "../../../data/@types/MovieInterface";

export type MovieProps = {
  item: MovieInterface;
  index: number;
  onRecord: Function;
  onPlay: Function;
  onDelete: Function;
};
