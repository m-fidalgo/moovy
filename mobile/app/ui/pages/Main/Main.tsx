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
import { ActivityIndicator, Title } from "react-native-paper";
import { Buffer } from "buffer";
import { MovieCarousel } from "../../components/MovieCarousel/MovieCarousel";
import { mainStyle } from "./Main.styles";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import { UnsynchedMovieInterface } from "../../../data/@types/UnsynchedMovieInterface";
import { ApiService } from "../../../data/services/ApiService";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from "rn-fetch-blob";
import AudioModal from "../../components/AudioModal/AudioModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const Main: React.FC = () => {
  const [movies, setMovies] = useState<MovieInterface[]>([]),
    [unsynchedMovies, setUnsynchedMovies] = useState<UnsynchedMovieInterface[]>(
      []
    ),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [isConnected, setIsConnected] = useState<boolean>(true),
    [isRecordModalOpen, setIsRecordModalOpen] = useState<boolean>(false),
    [isPlayModalOpen, setIsPlayModalOpen] = useState<boolean>(false),
    [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false),
    [selectedMovie, setSelectedMovie] = useState<MovieInterface>(),
    [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(false),
    [reviewUri, setReviewUri] = useState<string>(""),
    [recordingTime, setRecordingTime] = useState<string>("00:00:00"),
    [playingTime, setPlayingTime] = useState<string>("00:00:00"),
    [durationTime, setDurationTime] = useState<string>("00:00:00"),
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
          movie.is_synched = true;
          return movie;
        })
        .sort((a, b) => (a.title > b.title ? 1 : -1))
    );
    setIsLoading(false);
  }

  async function getUnsynchedMovies() {
    const keys = await AsyncStorage.getAllKeys();

    if (keys.length > 0) {
      const unsync = [] as MovieInterface[];
      movies.map((movie) => {
        if (keys.find((item) => parseInt(item) === movie.id)) {
          unsync.push(movie);
          movie.is_synched = false;
        } else movie.is_synched = true;
        return movie;
      });

      for (let i = 0; i < keys.length; i++) {
        AsyncStorage.getItem(keys[i]).then((review) => {
          let movie = {
            movie: unsync[0],
            review: review,
          };

          setUnsynchedMovies([...unsynchedMovies, movie]);
        });
      }
    }
  }

  async function pushUnsynched() {
    for (let i = 0; i < unsynchedMovies.length; i++) {
      const { movie, review } = unsynchedMovies[i];
      setSelectedMovie(movie);
      if (review == null) await deleteReviewDb();
      else {
        setReviewUri(review);
        await addReview();
      }
    }

    setUnsynchedMovies([]);
    await AsyncStorage.clear();
  }

  async function loadAfterNetChange() {
    await getUnsynchedMovies();
    await pushUnsynched();
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      //setIsConnected(state.isConnected ? state.isConnected : false);
      setIsConnected(state.type === "wifi" ? false : true);
      if (isConnected) loadAfterNetChange();
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  useEffect(() => {
    getPermissions();
    getMovies();
  }, []);

  //recording
  async function onRecord(movie: MovieInterface) {
    setIsRecordModalOpen(true);
    setSelectedMovie(movie);
  }

  async function onStartRecording() {
    const audioSet: AudioSet = {
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

    if (uri !== "") setReviewUri(uri);
  }

  async function onStopRecording() {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordingTime("00:00:00");
    setAudioRecorderPlayer(new AudioRecorderPlayer());
    setIsRecordModalOpen(false);

    if (isConnected) await addReview();
    else {
      if (selectedMovie?.id) {
        await AsyncStorage.setItem((selectedMovie?.id).toString(), reviewUri);
        await getUnsynchedMovies();
      }
    }
  }

  //inserting review
  async function addReview() {
    let review: string = "";

    RNFetchBlob.fs.readStream(reviewUri, "base64").then((ifstream) => {
      ifstream.open();
      ifstream.onData((chunk: string | number[]) => {
        if (typeof chunk === "string") review += chunk;
      });
      ifstream.onError((error) => console.log(error));
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
    if (isConnected) {
      await deleteReviewDb();
    } else {
      if (selectedMovie?.id) {
        await AsyncStorage.setItem((selectedMovie?.id).toString(), reviewUri);
        await getUnsynchedMovies();
      }
    }
    setIsDeleteModalOpen(false);
  }

  async function deleteReviewDb() {
    ApiService.put(`/library/${selectedMovie?.id}`, {
      review: null,
    })
      .then(() => {
        getMovies();
      })
      .catch((error) => console.log(error));
  }

  //play review
  function onPlay(movie: MovieInterface) {
    setSelectedMovie(movie);
    setIsPlayModalOpen(true);
  }

  function createReviewFile(review: Buffer) {
    const dirs = RNFetchBlob.fs.dirs;
    const path =
      Platform.select({
        ios: `${selectedMovie?.imdb_id}-review.m4a`,
        android: `${dirs.CacheDir}/${selectedMovie?.imdb_id}-review.mp3`,
      }) || "";

    RNFetchBlob.fs.writeStream(path, "base64").then((stream) => {
      if (review) {
        const bufString = review.toString("hex");
        stream.write(RNFetchBlob.base64.encode(bufString));
      }
      return stream.close();
    });

    return path;
  }

  async function onStartPlaying() {
    const path = createReviewFile(selectedMovie?.review as Buffer);
    console.log(path);
    audioRecorderPlayer
      .startPlayer(path)
      .then((msg) => console.log(msg))
      .then(() => {
        audioRecorderPlayer.addPlayBackListener((e) => {
          setPlayingTime(
            audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
          );
          setDurationTime(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
          return;
        });
      })
      .catch((err) => console.log(err));
  }

  async function onStopPlaying() {
    audioRecorderPlayer
      .stopPlayer()
      .then(() => {
        audioRecorderPlayer.removePlayBackListener();
        setPlayingTime("00:00:00");
        setDurationTime("00:00:00");
        setAudioRecorderPlayer(new AudioRecorderPlayer());
        setIsPlayModalOpen(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <AudioModal
        isOpen={isRecordModalOpen}
        setIsOpen={setIsRecordModalOpen}
        isPermissionGranted={isPermissionGranted}
        time={recordingTime}
        onStart={onStartRecording}
        onStop={onStopRecording}
        isRecording={true}
      />
      <AudioModal
        isOpen={isPlayModalOpen}
        setIsOpen={setIsPlayModalOpen}
        isPermissionGranted={isPermissionGranted}
        time={playingTime}
        onStart={onStartPlaying}
        onStop={onStopPlaying}
        isRecording={false}
        duration={durationTime}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        movie={selectedMovie}
        deleteReview={deleteReview}
      />
      {isLoading ? (
        <ActivityIndicator color="#F2911B" size="large" />
      ) : (
        <>
          <Title style={mainStyle.title}>My Library</Title>
          {movies.length > 0 ? (
            <MovieCarousel
              movies={movies}
              onRecord={onRecord}
              onPlay={onPlay}
              onDelete={onDelete}
            />
          ) : (
            <View style={mainStyle.noMoviesContainer}>
              <Image
                style={mainStyle.img}
                source={require("./assets/search.png")}
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
