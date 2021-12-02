import { Platform } from "react-native";
import { Buffer } from "buffer";
import RNFetchBlob from "rn-fetch-blob";

export const AudioFileService = {
  async getHexStringFromUri(uri: string) {
    let review = "";
    await RNFetchBlob.fs.readStream(uri, "base64").then((ifstream) => {
      ifstream.open();
      ifstream.onData((chunk: string | number[]) => {
        if (typeof chunk === "string") review = chunk;
      });
      ifstream.onError((error) => console.log(error));
      ifstream.onEnd(() => {
        const buffer = Buffer.from(review);
        review = buffer.toString("hex");
        console.log(review);
      });
    });

    return review;
  },
  getUriFromBuffer(buffer: Buffer, fileName: string) {
    const dirs = RNFetchBlob.fs.dirs;
    const path =
      Platform.select({
        ios: `${fileName}.m4a`,
        android: `${dirs.CacheDir}/${fileName}.mp3`,
      }) || "";

    RNFetchBlob.fs.writeStream(path, "base64").then((stream) => {
      if (buffer) {
        const bufString = buffer.toString("hex");
        stream.write(RNFetchBlob.base64.encode(bufString));
      }
      return stream.close();
    });

    return path;
  },
};
