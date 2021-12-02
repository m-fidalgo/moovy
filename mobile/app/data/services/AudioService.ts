import { Platform } from "react-native";
import AudioRecorderPlayer, {
  AudioSet,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from "react-native-audio-recorder-player";
import RNFetchBlob from "rn-fetch-blob";

export const AudioService = {
  async onStartRecording(
    audioRecorderPlayer: AudioRecorderPlayer,
    fileName: string,
    setRecordingTime: Function
  ) {
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: `${fileName}.m4a`,
      android: `${dirs.CacheDir}/${fileName}.mp3`,
    });

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
      );
    });

    return uri;
  },
  async onStopRecording(
    audioRecorderPlayer: AudioRecorderPlayer,
    setRecordingTime: Function
  ) {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordingTime("00:00:00");
    audioRecorderPlayer = new AudioRecorderPlayer();
  },
  async onStartPlaying(
    audioRecorderPlayer: AudioRecorderPlayer,
    setPlayingTime: Function,
    setDurationTime: Function,
    path: string
  ) {
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
  },
  async onStopPlaying(
    audioRecorderPlayer: AudioRecorderPlayer,
    setPlayingTime: Function,
    setDurationTime: Function
  ) {
    audioRecorderPlayer
      .stopPlayer()
      .then(() => {
        audioRecorderPlayer.removePlayBackListener();
        setPlayingTime("00:00:00");
        setDurationTime("00:00:00");
        audioRecorderPlayer = new AudioRecorderPlayer();
      })
      .catch((err) => console.log(err));
  },
};
