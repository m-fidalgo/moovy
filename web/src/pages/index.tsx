import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { MainContainer, SubContainer } from '../ui/styles/index.styled';
import { MovieInterface } from '../data/@types/MovieInterface';
import useApiGet from '../data/hooks/useApiGet';
import Header from '../ui/components/Header/Header';
import TextInput from '../ui/components/TextInput/TextInput';
import MovieList from '../ui/components/MovieList/MovieList';
import ErrorContainer from '../ui/components/ErrorContainer/ErrorContainer';
import { Button } from '@mui/material';

const Home: NextPage = () => {
  const {
    isLoading,
    text,
    setText,
    allMovies,
    libraryMovies,
    error,
    setError,
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

  function toggleView(library: boolean) {
    setText('');
    setError('');
    setIsLibrarySelected(library);

    if (library) getLibraryMovies();
  }

  function onSearch() {
    isLibrarySelected ? getLibraryMovies() : getAllMovies();
  }

  function onAdd(movie: MovieInterface) {
    console.log('a');
  }

  function onRemove(movie: MovieInterface) {}

  return (
    <MainContainer>
      <Header
        isLibrarySelected={isLibrarySelected}
        onSearchSelect={() => toggleView(false)}
        onLibrarySelect={() => toggleView(true)}
      />
      <SubContainer>
        <TextInput value={text} onChange={(e) => setText(e.target.value)} />
        <Button variant='contained' onClick={() => onSearch()}>
          Search
        </Button>
        {!isLoading && movies.length > 0 && error === '' && (
          <MovieList movies={movies} onAdd={onAdd} onRemove={onRemove} />
        )}
        {!isLoading && error && <ErrorContainer error={error} />}
      </SubContainer>
    </MainContainer>
  );
};

export default Home;
