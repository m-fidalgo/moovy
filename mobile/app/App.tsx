import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Provider, Title, Portal, Modal, Button } from "react-native-paper";
import { MovieCarousel } from "./ui/components/MovieCarousel/MovieCarousel";
import { appStyle } from "./ui/styles/App.styles";
import { MovieInterface } from "./data/@types/MovieInterface";
import { ApiService } from "./data/services/ApiService";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonIcon from "./ui/components/ButtonIcon/ButtonIcon";

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieInterface[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [isModalOpen, setIsModalOpen] = useState<boolean>(false),
    [selectedMovie, setSelectedMovie] = useState<MovieInterface>();

  //movies
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

  //recording
  function onRecord(movie: MovieInterface) {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  }

  return (
    <Provider>
      <SafeAreaView style={appStyle.container}>
        <Portal>
          <Modal
            visible={isModalOpen}
            onDismiss={() => setIsModalOpen(false)}
            style={appStyle.modal}
          >
            <View style={appStyle.recordingTimeContainer}>
              <Icon name="fiber-manual-record" size={30} color="#FE0000" />
              <Text style={appStyle.recordingTime}>00:00</Text>
            </View>
            <View style={appStyle.recordingButtonsContainer}>
              <ButtonIcon
                onPress={() => {}}
                name="mic-none"
                color="#000000"
                backgroundColor="#6CD3AE"
                size={30}
              />
              <ButtonIcon
                onPress={() => {}}
                name="stop"
                color="#000000"
                backgroundColor="#FE6D8E"
                size={30}
              />
            </View>
          </Modal>
        </Portal>
        <Title style={appStyle.title}>My Library</Title>

        {!isLoading && movies.length > 0 && (
          <MovieCarousel movies={movies} onRecord={onRecord} />
        )}
        {!isLoading && movies.length == 0 && (
          <View style={appStyle.noMoviesContainer}>
            <Image
              style={appStyle.img}
              source={require("./assets/search.png")}
            />
            <Text style={appStyle.message}>
              It looks like there are no movies in your library! Go to you web
              application and add some!
            </Text>
          </View>
        )}
      </SafeAreaView>
    </Provider>
  );
};

export default App;
