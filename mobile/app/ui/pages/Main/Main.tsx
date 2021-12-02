import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Image,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";

import { mainStyle } from "./Main.styles";
import { getPermissions } from "../../../data/utils/getPermissions";
import { RootState, Dispatch } from "../../../data/stores/store";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import AudioModal from "../../components/AudioModal/AudioModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import { AudioService } from "../../../data/services/AudioService";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { AudioFileService } from "../../../data/services/AudioFileService";

const Main: React.FC = () => {
  let audioRecorderPlayer = new AudioRecorderPlayer();
  const moviesState = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch<Dispatch>();
  const [isLoading, setIsLoading] = useState(true),
    [isPermissionGranted, setIsPermissionGranted] = useState(true),
    [isConnected, setIsConnected] = useState(false),
    [selectedMovie, setSelectedMovie] = useState<MovieInterface>(),
    [isRecording, setIsRecording] = useState(false),
    [isRecordModalOpen, setIsRecordModalOpen] = useState(false),
    [isPlayModalOpen, setIsPlayModalOpen] = useState(false),
    [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false),
    [uri, setUri] = useState(""),
    [time, setTime] = useState("00:00:00"),
    [duration, setDuration] = useState("00:00:00");

  async function getMovies() {
    setIsLoading(true);
    await dispatch.movies.getMovies();
    setIsLoading(false);
  }

  async function checkPermissions() {
    setIsPermissionGranted(await getPermissions());
  }

  async function checkConnection() {
    if (isConnected) {
      if (moviesState.unsynchedMovies !== [])
        dispatch.movies.pushUnsynched(moviesState.unsynchedMovies);
    }
  }

  useEffect(() => {
    checkPermissions();
    getMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      //setIsConnected(state.isConnected ? state.isConnected : false);
      setIsConnected(state.type === "wifi" ? false : true);
      checkConnection();
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  //recording
  function onClickRecord(movie: MovieInterface) {
    setSelectedMovie(movie);
    setIsRecording(true);
    setIsRecordModalOpen(true);
  }

  async function onStartRecording() {
    setUri(
      await AudioService.onStartRecording(
        audioRecorderPlayer,
        `${selectedMovie?.imdb_id}-review`,
        setTime
      )
    );
  }

  async function onStopRecording() {
    await AudioService.onStopRecording(audioRecorderPlayer, setTime);
    setIsRecordModalOpen(false);
    if (selectedMovie !== undefined) {
      if (isConnected)
        await dispatch.movies.addReview({
          id: selectedMovie?.id,
          reviewUri: uri,
        });
      else
        await dispatch.movies.addUnsynchedMovie({
          movie: selectedMovie,
          reviewUri: uri,
        });
    } else console.log("é undefined");
    setSelectedMovie(undefined);
    setUri("");
  }

  //playing
  function onClickPlay(movie: MovieInterface) {
    setSelectedMovie(movie);
    setIsRecording(false);
    setIsPlayModalOpen(true);
  }

  function onStartPlaying() {
    let path = "";

    if (selectedMovie?.review)
      path = AudioFileService.getUriFromBuffer(
        selectedMovie?.review,
        `${selectedMovie?.imdb_id}-review`
      );

    AudioService.onStartPlaying(
      audioRecorderPlayer,
      setTime,
      setDuration,
      path
    );
  }

  async function onStopPlaying() {
    await AudioService.onStopPlaying(audioRecorderPlayer, setTime, setDuration);
    setIsPlayModalOpen(false);
    setSelectedMovie(undefined);
  }

  //delete
  function onClickDelete(movie: MovieInterface) {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  }

  function onDelete() {
    if (selectedMovie !== undefined) {
      if (isConnected) {
        dispatch.movies.deleteReview(selectedMovie.id);
      } else {
        dispatch.movies.addUnsynchedMovie({
          movie: selectedMovie,
          reviewUri: null,
        });
      }

      setSelectedMovie(undefined);
    }
    setIsDeleteModalOpen(false);
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <AudioModal
        isOpen={isRecording ? isRecordModalOpen : isPlayModalOpen}
        setIsOpen={isRecording ? setIsRecordModalOpen : setIsPlayModalOpen}
        isPermissionGranted={isPermissionGranted}
        time={time}
        onStart={isRecording ? onStartRecording : onStartPlaying}
        onStop={isRecording ? onStopRecording : onStopPlaying}
        isRecording={isRecording}
        duration={isRecording ? "" : duration}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        movie={selectedMovie}
        deleteReview={onDelete}
      />
      {isLoading ? (
        <ActivityIndicator color="#F2911B" size="large" />
      ) : (
        <>
          <Title style={mainStyle.title}>My Library</Title>
          {moviesState.movies.length > 0 ? (
            <MovieCarousel
              movies={moviesState.movies}
              onRecord={onClickRecord}
              onPlay={onClickPlay}
              onDelete={onClickDelete}
            />
          ) : (
            <View style={mainStyle.noMoviesContainer}>
              <Image
                style={mainStyle.img}
                source={require("../../../assets/search.png")}
              />
              <Text style={mainStyle.message}>
                It looks like there are no movies in your library! Go to you web
                application and add some!
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Main;
