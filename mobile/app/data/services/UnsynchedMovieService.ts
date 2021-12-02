import AsyncStorage from "@react-native-community/async-storage";
import { MovieInterface } from "../@types/MovieInterface";
import { UnsynchedMovieInterface } from "../@types/UnsynchedMovieInterface";

export const UnsynchedMovieService = {
  async getUnsynchedMovies(movies: MovieInterface[]) {
    const unsynchedMovies = [] as UnsynchedMovieInterface[];
    const keys = await AsyncStorage.getAllKeys();

    if (keys.length > 0) {
      const tempMovies = [] as MovieInterface[];

      movies.forEach((movie) => {
        if (keys.find((item) => parseInt(item) === movie.id)) {
          tempMovies.push(movie);
        }
      });

      for (let i = 0; i < keys.length; i++) {
        AsyncStorage.getItem(keys[i]).then((review) => {
          unsynchedMovies.push({
            movie: tempMovies[0],
            review,
          });
        });
      }
    }

    return unsynchedMovies;
  },
  async addUnsynchedMovie(id: number, uri: string) {
    return await AsyncStorage.setItem(id.toString(), uri !== null ? uri : "");
  },
  async clearUnsynchedMovies() {
    return await AsyncStorage.clear();
  },
};
