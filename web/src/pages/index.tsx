import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, Dispatch } from "../data/stores/store";
import {
  LoadingContainer,
  MainContainer,
  SubContainer,
} from "../ui/styles/index.styled";
import { MovieInterface } from "../data/@types/MovieInterface";
import Header from "../ui/components/Header/Header";
import TextInput from "../ui/components/TextInput/TextInput";
import MovieList from "../ui/components/MovieList/MovieList";
import ErrorContainer from "../ui/components/ErrorContainer/ErrorContainer";
import { Button, CircularProgress } from "@mui/material";

const Home: NextPage = () => {
  const moviesState = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<Dispatch>();
  const [isLoading, setIsLoading] = useState(false),
    [isLibrarySelected, setIsLibrarySelected] = useState(false),
    [text, setText] = useState("");

  useEffect(() => {
    if (isLibrarySelected) getMovies();
  }, [isLibrarySelected]);

  async function toggleView(library: boolean) {
    setText("");
    setIsLibrarySelected(library);

    dispatch.movies.CLEAR_MOVIES();
  }

  async function getMovies() {
    setIsLoading(true);

    isLibrarySelected
      ? await dispatch.movies.getLibraryMovies(text)
      : await dispatch.movies.getOmdbMovies(text);

    setIsLoading(false);
  }

  function onAdd(movie: MovieInterface) {
    console.log("a");
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
        <Button variant="contained" onClick={() => getMovies()}>
          Search
        </Button>
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            {moviesState.movies.length > 0 && moviesState.error === "" && (
              <MovieList
                movies={moviesState.movies}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            )}
            {moviesState.error !== "" && (
              <ErrorContainer error={moviesState.error} />
            )}
          </>
        )}
      </SubContainer>
    </MainContainer>
  );
};

export default Home;
