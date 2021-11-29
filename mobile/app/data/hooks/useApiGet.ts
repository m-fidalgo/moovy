import React, { useState } from 'react';
import { MovieInterface } from '../@types/MovieInterface';
import { ApiService } from '../services/ApiService';

export default function useApiGet() {
  const [isLoading, setIsLoading] = useState(false),
    [libraryMovies, setLibraryMovies] = useState([] as MovieInterface[]),
    [error, setError] = useState('');

  async function getLibraryMovies() {
    setIsLoading(true);
    setError('');

    try {
      const { data } = await ApiService.get<MovieInterface[]>('/library');

      if (data.length === 0) {
        setError(
          'It looks like there are no movies in your library! Search for a movie you have watched and add it here!'
        );
        return;
      }

      setLibraryMovies(
        data
          .map((movie) => {
            movie.is_on_library = true;
            return movie;
          })
          .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
    } catch (error) {
      setError(
        'It looks like there are no movies in your library! Search for a movie you have watched and add it here!'
      );
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    libraryMovies,
    error,
    setError,
    getLibraryMovies,
  };
}
