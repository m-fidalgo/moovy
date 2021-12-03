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
    ADD_MOVIE: (state: MovieState, movie: MovieInterface) => {
      return {
        ...state,
        movies: state.movies.map((item) => {
          if (item.id === movie.id) movie.is_on_library = true;
          return item;
        }),
        error: "",
      };
    },
    REMOVE_MOVIE: (state: MovieState, id: number, isFromLibrary: boolean) => {
      const movies = isFromLibrary
        ? state.movies.filter((item) => item.id !== id)
        : state.movies.map((item) => {
            if (item.id === id) item.is_on_library = false;
            return item;
          });

      return {
        ...state,
        movies,
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

          const libraryData: MovieInterface[] =
            await MovieService.getFromLibrary()
              .then((resp) => resp.data)
              .then((data) =>
                data.filter((movie) =>
                  movie.title.toLowerCase().includes(text.toLowerCase())
                )
              );

          data
            .map((movie) => {
              const item = libraryData.filter(
                (item) => item.imdb_id === movie.imdb_id
              )[0];
              if (item) {
                movie.is_on_library = true;
                movie.id = item.id;
              } else movie.is_on_library = false;
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
      async addToLibrary(movie: MovieInterface): Promise<any> {
        try {
          await MovieService.addToLibrary(movie);
          movies.ADD_MOVIE(movie);
        } catch (error) {
          movies.SET_MOVIES([], "Error while adding to library :(");
        }
      },
      async removeFromLibrary({ id, isFromLibrary }): Promise<any> {
        try {
          await MovieService.removeFromLibrary(id);

          movies.REMOVE_MOVIE(id, isFromLibrary);
        } catch (error) {
          movies.SET_MOVIES([], "Error while removing library :(");
        }
      },
    };
  },
});
