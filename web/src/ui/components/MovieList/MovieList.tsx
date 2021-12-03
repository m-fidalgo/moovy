import React from "react";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import Movie from "../Movie/Movie";
import { MovieListContainer } from "./MovieList.styled";
import { MovieListProps } from "./MovieList.types";

const MovieList: React.FC<MovieListProps> = ({ movies, onAdd, onRemove }) => {
  return (
    <MovieListContainer>
      {movies.map((movie) => {
        return (
          <Movie
            key={movie.imdb_id}
            movie={movie}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        );
      })}
    </MovieListContainer>
  );
};

export default MovieList;
