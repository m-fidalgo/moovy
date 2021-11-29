import React from 'react';
import { MovieInterface } from '../../../data/@types/MovieInterface';
import {
  MovieCard,
  MovieCardMedia,
  MovieCardContent,
  MovieCardTitle,
  MovieCardInfos,
  MovieCardPill,
} from './Movie.styled';

interface MovieProps {
  movie: MovieInterface;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <MovieCard>
      <MovieCardMedia image={movie.poster} />
      <MovieCardContent>
        <MovieCardTitle>{movie.title}</MovieCardTitle>
        <MovieCardInfos>
          <MovieCardPill>{movie.year}</MovieCardPill>
          {movie.is_on_library ? (
            <MovieCardPill>Remove</MovieCardPill>
          ) : (
            <MovieCardPill>Add</MovieCardPill>
          )}
        </MovieCardInfos>
      </MovieCardContent>
    </MovieCard>
  );
};

export default Movie;
