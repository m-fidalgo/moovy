import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { MainContainer } from '../ui/styles/index.styled';
import { Button, Container } from '@mui/material';
import useApiGet from '../data/hooks/useApiGet';
import Header from '../ui/components/Header/Header';
import MovieList from '../ui/components/MovieList/MovieList';

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

  return (
    <MainContainer>
      <Header
        isLibrarySelected={isLibrarySelected}
        onSearchSelect={() => setIsLibrarySelected(false)}
        onLibrarySelect={() => setIsLibrarySelected(true)}
      />
      <Container>
        <Button onClick={() => getAllMovies('star')}>aa</Button>
        {movies.length > 0 && <MovieList movies={movies} />}
      </Container>
    </MainContainer>
  );
};

export default Home;
