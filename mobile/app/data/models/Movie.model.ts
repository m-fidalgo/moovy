import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { MovieInterface } from "../@types/MovieInterface";
import { MovieState } from "../@types/MovieState";
import { MovieService } from "../services/MovieService";
import { UnsynchedMovieService } from "../services/UnsynchedMovieService";
import { AudioFileService } from "../services/AudioFileService";
import { UnsynchedMovieInterface } from "../@types/UnsynchedMovieInterface";

export const movies = createModel<RootModel>()({
  state: {
    movies: [],
    unsynchedMovies: [],
  } as MovieState,
  reducers: {
    SET_MOVIES: (
      state: MovieState,
      movies: MovieInterface[],
      unsynchedMovies: UnsynchedMovieInterface[]
    ) => {
      return {
        ...state,
        movies,
        unsynchedMovies,
      };
    },
    UPDATE_MOVIES: (state: MovieState, movie: MovieInterface) => {
      const movies = [
        ...state.movies.filter((item) => item.id !== movie.id),
        movie,
      ];

      return {
        ...state,
        movies: movies.sort((a, b) => (a.title > b.title ? 1 : -1)),
        unsynchedMovies: state.unsynchedMovies,
      };
    },
    CLEAR_UNSYNCHED: (state: MovieState) => {
      return {
        ...state,
        movies: state.movies,
        unsynchedMovies: [] as UnsynchedMovieInterface[],
      };
    },
    ADD_UNSYNCHED: (
      state: MovieState,
      unsynchedMovie: UnsynchedMovieInterface
    ) => {
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === unsynchedMovie.movie.id) movie.is_synched = false;
          return movie;
        }),
        unsynchedMovies: [...state.unsynchedMovies, unsynchedMovie],
      };
    },
  },
  effects: (dispatch) => {
    const { movies } = dispatch;

    return {
      async getMovies(): Promise<any> {
        let { data }: { data: MovieInterface[] } = await MovieService.list();
        const unsynchedMovies = await UnsynchedMovieService.getUnsynchedMovies(
          data
        );
        data = data
          .map((movie) => {
            if (unsynchedMovies.find((item) => item.movie.id === movie.id))
              movie.is_synched = false;
            else movie.is_synched = true;
            return movie;
          })
          .sort((a, b) => (a.title > b.title ? 1 : -1));

        movies.SET_MOVIES(data, unsynchedMovies);
      },
      async addReview({ id, reviewUri }): Promise<any> {
        const review = await AudioFileService.getHexStringFromUri(reviewUri);
        const { data }: { data: MovieInterface } = await MovieService.addReview(
          id,
          review
        );
        data.is_synched = true;
        movies.UPDATE_MOVIES(data);
      },
      async deleteReview(id: number) {
        const { data }: { data: MovieInterface } =
          await MovieService.deleteReview(id);
        data.is_synched = true;
        movies.UPDATE_MOVIES(data);
      },
      async pushUnsynched(unsynchedMovies: UnsynchedMovieInterface[]) {
        unsynchedMovies.forEach(async (item) => {
          if (item.review === "") {
            await movies.deleteReview(item.movie.id);
          } else await movies.addReview(item.review);
        });
        await UnsynchedMovieService.clearUnsynchedMovies();
        movies.CLEAR_UNSYNCHED();
      },
      async addUnsynchedMovie({ movie, reviewUri }) {
        await UnsynchedMovieService.addUnsynchedMovie(movie.id, reviewUri);
        const unsynchedMovie: UnsynchedMovieInterface = {
          movie,
          review: reviewUri,
        };

        movies.ADD_UNSYNCHED(unsynchedMovie);
      },
    };
  },
});
