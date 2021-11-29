import React from 'react';
import { MovieInterface } from '../../../data/@types/MovieInterface';
import Movie from '../Movie/Movie';
import { MovieListContainer } from './MovieList.styled';

interface MovieListProps {
  movies: MovieInterface[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <MovieListContainer>
      {movies.map((movie) => {
        return <Movie key={movie.imdb_id} movie={movie} />;
      })}
    </MovieListContainer>
  );
};

export default MovieList;
