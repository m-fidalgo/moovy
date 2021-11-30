import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Title } from "react-native-paper";
import { MovieCarousel } from "./ui/components/MovieCarousel/MovieCarousel";
import { appStyle } from "./ui/styles/App.styles";
import { MovieInterface } from "./data/@types/MovieInterface";
import { ApiService } from "./data/services/ApiService";

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieInterface[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(true);

  async function getMovies() {
    const { data } = await ApiService.get<MovieInterface[]>("/library");
    setMovies(
      data
        .map((movie) => {
          movie.is_on_library = true;
          return movie;
        })
        .sort((a, b) => (a.title > b.title ? 1 : -1))
    );
    setIsLoading(false);
  }

  useEffect(() => {
    getMovies();
    return () => {};
  }, []);

  function onRecord(movie: MovieInterface) {
    console.log("a");
  }

  return (
    <SafeAreaView style={appStyle.container}>
      <Title style={appStyle.title}>My Library</Title>
      {!isLoading && movies.length > 0 && (
        <MovieCarousel movies={movies} onRecord={onRecord} />
      )}
      {!isLoading && movies.length == 0 && (
        <View style={appStyle.noMoviesContainer}>
          <Image style={appStyle.img} source={require("./assets/search.png")} />
          <Text style={appStyle.message}>
            It looks like there are no movies in your library! Go to you web
            application and add some!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
