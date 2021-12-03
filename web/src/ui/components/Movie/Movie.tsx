import React from "react";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import {
  MovieCard,
  MovieCardMedia,
  MovieCardTitle,
  MovieCardInfos,
  MovieCardPill,
  MovieAddCircleIcon,
  MovieRemoveCircleIcon,
} from "./Movie.styled";

interface MovieProps {
  movie: MovieInterface;
  onAdd: Function;
  onRemove: Function;
}

const Movie: React.FC<MovieProps> = ({ movie, onAdd, onRemove }) => {
  return (
    <MovieCard>
      <MovieCardMedia image={movie.poster} />
      <MovieCardTitle>{movie.title}</MovieCardTitle>
      <MovieCardInfos>
        <MovieCardPill>{movie.year}</MovieCardPill>
        {movie.is_on_library ? (
          <MovieRemoveCircleIcon onClick={() => onRemove(movie.id)} />
        ) : (
          <MovieAddCircleIcon onClick={() => onAdd(movie)} />
        )}
      </MovieCardInfos>
    </MovieCard>
  );
};

export default Movie;
