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
import { Provider, Title, Portal, Modal } from "react-native-paper";
import { MovieCarousel } from "./ui/components/MovieCarousel/MovieCarousel";
import { appStyle } from "./ui/styles/App.styles";
import { MovieInterface } from "./data/@types/MovieInterface";
import { ApiService } from "./data/services/ApiService";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonIcon from "./ui/components/ButtonIcon/ButtonIcon";
import RNFetchBlob from "rn-fetch-blob";

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieInterface[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [isModalOpen, setIsModalOpen] = useState<boolean>(false),
    [selectedMovie, setSelectedMovie] = useState<MovieInterface>(),
    [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false),
    [reviewUri, setReviewUri] = useState<string>(""),
    [recordingSecs, setRecordingSecs] = useState<number>(0),
    [recordingTime, setRecordingTime] = useState<string>("00:00:00"),
    [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
      new AudioRecorderPlayer()
    );

  //permissions
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
    getPermissions();
    getMovies();
    return () => {};
  }, []);

  //recording
  async function onRecord(movie: MovieInterface) {
    setIsModalOpen(true);
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
      ios: "hello.m4a",
      android: `${dirs.CacheDir}/${selectedMovie?.imdb_id}-review.mp4`,
    });

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingSecs(e.currentPosition);
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
    setRecordingSecs(0);
    setRecordingTime("00:00:00");
    console.log(result);
    setAudioRecorderPlayer(new AudioRecorderPlayer());
    setIsModalOpen(false);
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
            {isPermissionGranted ? (
              <>
                <View style={appStyle.recordingTimeContainer}>
                  <Icon name="fiber-manual-record" size={30} color="#FE0000" />
                  <Text style={appStyle.recordingTime}>{recordingTime}</Text>
                </View>
                <View style={appStyle.recordingButtonsContainer}>
                  <ButtonIcon
                    onPress={() => onStartRecording()}
                    name="mic-none"
                    color="#000000"
                    backgroundColor="#6CD3AE"
                    size={30}
                  />
                  <ButtonIcon
                    onPress={() => onStopRecording()}
                    name="stop"
                    color="#000000"
                    backgroundColor="#FE6D8E"
                    size={30}
                  />
                </View>
              </>
            ) : (
              <View>
                <Text style={appStyle.modalErrorText}>
                  Permissions not granted
                </Text>
              </View>
            )}
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
