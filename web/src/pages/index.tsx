import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { MainContainer } from '../ui/styles/index.styled';
import { Button, Container } from '@mui/material';
import useApiGet from '../data/hooks/useApiGet';
import Header from '../ui/components/Header/Header';
import MovieList from '../ui/components/MovieList/MovieList';
import { MovieInterface } from '../data/@types/MovieInterface';

const Home: NextPage = () => {
  const {
    isLoading,
    text,
    setText,
    allMovies,
    libraryMovies,
    error,
    getAllMovies,
    getLibraryMovies,
  } = useApiGet();
  const [isLibrarySelected, setIsLibrarySelected] = useState(false);
  const [movies, setMovies] = useState(
    isLibrarySelected ? libraryMovies : allMovies
  );

  useEffect(() => {
    setMovies(isLibrarySelected ? libraryMovies : allMovies);
  }, [isLibrarySelected, libraryMovies, allMovies]);

  function onAdd(movie: MovieInterface) {
    console.log('a');
  }

  function onRemove(movie: MovieInterface) {}

  return (
    <MainContainer>
      <Header
        isLibrarySelected={isLibrarySelected}
        onSearchSelect={() => setIsLibrarySelected(false)}
        onLibrarySelect={() => setIsLibrarySelected(true)}
      />
      <Container>
        <Button
          onClick={() => {
            setText('star');
            getAllMovies();
          }}
        >
          aa
        </Button>
        {movies.length > 0 && (
          <MovieList movies={movies} onAdd={onAdd} onRemove={onRemove} />
        )}
      </Container>
    </MainContainer>
  );
};

export default Home;
