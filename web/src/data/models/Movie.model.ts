import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { MovieInterface } from "../@types/MovieInterface";
import { MovieState } from "../@types/MovieState";
import { MovieService } from "../services/MovieService";

export const movies = createModel<RootModel>()({
  state: {
    movies: [],
    error: "",
  } as MovieState,
  reducers: {
    SET_MOVIES: (
      state: MovieState,
      movies: MovieInterface[],
      error: string
    ) => {
      return {
        ...state,
        movies,
        error,
      };
    },
    CLEAR_MOVIES: (state: MovieState) => {
      return {
        ...state,
        movies: [],
        error: "",
      };
    },
  },
  effects: (dispatch) => {
    const { movies } = dispatch;

    return {
      async getLibraryMovies(text: string): Promise<any> {
        let { data }: { data: MovieInterface[] } =
          await MovieService.getFromLibrary();

        if (text !== "")
          data = data.filter((movie) =>
            movie.title.toLowerCase().includes(text.toLowerCase())
          );

        data = data
          .map((movie) => {
            movie.is_on_library = true;
            return movie;
          })
          .sort((a, b) => (a.title > b.title ? 1 : -1));

        if (data.length > 0) movies.SET_MOVIES(data, "");
        else {
          text === ""
            ? movies.SET_MOVIES(
                [],
                "It looks like there are no movies in your library! Search for a movie you have watched and add it here!"
              )
            : movies.SET_MOVIES(
                [],
                "We couldn´t find the movies you were looking for :("
              );
        }
      },
      async getOmdbMovies(text: string): Promise<any> {
        try {
          let { data }: { data: MovieInterface[] } =
            await MovieService.getFromOmdb(text);
          data
            .map((movie) => {
              movie.is_on_library = false;
              return movie;
            })
            .sort((a, b) => (a.title > b.title ? 1 : -1));

          movies.SET_MOVIES(data, "");
        } catch (error) {
          movies.SET_MOVIES(
            [],
            "We couldn´t find the movies you were looking for :("
          );
        }
      },
    };
  },
});
