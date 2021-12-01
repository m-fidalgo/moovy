import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from "react-native";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
import { Provider, Title } from "react-native-paper";
import { Buffer } from "buffer";
import { MovieCarousel } from "./ui/components/MovieCarousel/MovieCarousel";
import { appStyle } from "./ui/styles/App.styles";
import { MovieInterface } from "./data/@types/MovieInterface";
import { ApiService } from "./data/services/ApiService";
import RNFetchBlob from "rn-fetch-blob";
import RecordModal from "./ui/components/RecordModal/RecordModal";
import DeleteModal from "./ui/components/DeleteModal/DeleteModal";

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieInterface[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [isRecordModalOpen, setIsRecordModalOpen] = useState<boolean>(false),
    [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false),
    [selectedMovie, setSelectedMovie] = useState<MovieInterface>(),
    [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false),
    [reviewUri, setReviewUri] = useState<string>(""),
    [recordingTime, setRecordingTime] = useState<string>("00:00:00"),
    [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
      new AudioRecorderPlayer()
    );

  //useEffect related
  async function getPermissions() {
    if (Platform.OS === "android") {
      let permission = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        permission["android.permission.WRITE_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        permission["android.permission.READ_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        permission["android.permission.RECORD_AUDIO"] ===
          PermissionsAndroid.RESULTS.GRANTED
      )
        setIsPermissionGranted(true);
      else setIsPermissionGranted(false);
    }
  }

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
    getPermissions();
    getMovies();
    return () => {};
  }, []);

  //recording
  async function onRecord(movie: MovieInterface) {
    setIsRecordModalOpen(true);
    setSelectedMovie(movie);
  }

  async function onStartRecording() {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: `${selectedMovie?.imdb_id}-review.m4a`,
      android: `${dirs.CacheDir}/${selectedMovie?.imdb_id}-review.mp3`,
    });

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
      );
      return;
    });

    console.log(uri);
    if (uri !== "") setReviewUri(uri);
  }

  async function onStopRecording() {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordingTime("00:00:00");
    console.log(result);
    setAudioRecorderPlayer(new AudioRecorderPlayer());
    setIsRecordModalOpen(false);
    addReview();
  }

  //inserting review
  async function addReview() {
    let review: string = "";

    RNFetchBlob.fs.readStream(reviewUri, "base64").then((ifstream) => {
      ifstream.open();
      ifstream.onData((chunk: string | number[]) => {
        if (typeof chunk === "string") review += chunk;
      });
      ifstream.onError((err) => {
        console.log("oops", err);
      });
      ifstream.onEnd(() => {
        const buffer = Buffer.from(review);
        const bufString = buffer.toString("hex");
        ApiService.put(`/library/${selectedMovie?.id}`, {
          review: "\\x" + bufString,
        })
          .then(() => getMovies())
          .catch((error) => console.log(error));
      });
    });
  }

  //delete review
  function onDelete(movie: MovieInterface) {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  }

  async function deleteReview() {
    ApiService.put(`/library/${selectedMovie?.id}`, {
      review: null,
    })
      .then(() => {
        getMovies();
        setIsDeleteModalOpen(false);
      })
      .catch((error) => console.log(error));
  }

  //play review
  function onPlay(review: Buffer) {}

  return (
    <Provider>
      <SafeAreaView style={appStyle.container}>
        <RecordModal
          isOpen={isRecordModalOpen}
          setIsOpen={setIsRecordModalOpen}
          isPermissionGranted={isPermissionGranted}
          recordingTime={recordingTime}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          movie={selectedMovie}
          deleteReview={deleteReview}
        />
        <Title style={appStyle.title}>My Library</Title>
        {!isLoading && movies.length > 0 && (
          <MovieCarousel
            movies={movies}
            onRecord={onRecord}
            onPlay={onPlay}
            onDelete={onDelete}
          />
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
