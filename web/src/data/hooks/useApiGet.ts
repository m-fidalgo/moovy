import React, { useState } from 'react';
import { MovieInterface } from '../@types/MovieInterface';
import { ApiService } from '../services/ApiService';

export default function useApiGet() {
  const [isLoading, setIsLoading] = useState(false),
    [text, setText] = useState(''),
    [libraryMovies, setLibraryMovies] = useState([] as MovieInterface[]),
    [allMovies, setAllMovies] = useState([] as MovieInterface[]),
    [error, setError] = useState('');

  async function getAllMovies(text: string) {
    setIsLoading(true);
    setError('');

    try {
      setLibraryMovies(await getLibraryMovies());
      const omdbMovies = await getOmdbMovies(text);

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

  async function getLibraryMovies(): Promise<MovieInterface[]> {
    const { data } = await ApiService.get<MovieInterface[]>('/library');

    return data
      .filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase()))
      .map((movie) => {
        movie.is_on_library = true;
        return movie;
      })
      .sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  async function getOmdbMovies(text: string): Promise<MovieInterface[]> {
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
