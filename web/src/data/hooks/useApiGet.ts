import React, { useState } from 'react';
import { MovieInterface } from '../@types/MovieInterface';
import { ApiService } from '../services/ApiService';

export default function useApiGet() {
  const [isLoading, setIsLoading] = useState(false),
    [text, setText] = useState(''),
    [libraryMovies, setLibraryMovies] = useState([] as MovieInterface[]),
    [allMovies, setAllMovies] = useState([] as MovieInterface[]),
    [error, setError] = useState('');

  async function getAllMovies() {
    setIsLoading(true);
    setError('');

    try {
      await getLibraryMovies();
      const omdbMovies = await getOmdbMovies();

      omdbMovies
        .map((movie: MovieInterface) => {
          const libraryMovie = libraryMovies.find(
            (item) => item.imdb_id === movie.imdb_id
          );
          if (libraryMovie) {
            movie.id = libraryMovie.id;
            movie.is_on_library = true;
            return movie;
          } else {
            movie.is_on_library = false;
            return movie;
          }
        })
        .sort((a, b) => (a.title > b.title ? 1 : -1));

      setAllMovies(omdbMovies);
    } catch (error) {
      setError('Movie not found');
    }

    setIsLoading(false);
  }

  async function getLibraryMovies() {
    try {
      const { data } = await ApiService.get<MovieInterface[]>('/library');

      setLibraryMovies(
        data
          .filter((movie) =>
            movie.title.toLowerCase().includes(text.toLowerCase())
          )
          .map((movie) => {
            movie.is_on_library = true;
            return movie;
          })
          .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
    } catch (error) {
      setError('Movie not found');
    }
  }

  async function getOmdbMovies(): Promise<MovieInterface[]> {
    const { data } = await ApiService.get<MovieInterface[]>(`/omdb/${text}`);
    return data;
  }

  return {
    isLoading,
    text,
    setText,
    allMovies,
    libraryMovies,
    error,
    getAllMovies,
    getLibraryMovies,
  };
}
