import { MovieInterface } from "../../../data/@types/MovieInterface";

export type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: Function;
  movie?: MovieInterface;
  deleteReview: Function;
};
