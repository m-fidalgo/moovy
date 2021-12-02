import { Models } from "@rematch/core";
import { movies } from "./Movie.model";

export interface RootModel extends Models<RootModel> {
  movies: typeof movies;
}

export const models: RootModel = { movies };
