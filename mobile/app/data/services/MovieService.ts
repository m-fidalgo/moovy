import AsyncStorage from "@react-native-community/async-storage";
import { MovieInterface } from "../@types/MovieInterface";
import { ApiService } from "./ApiService";

const endpoint = "/library";

export const MovieService = {
  list() {
    return ApiService.get<MovieInterface[]>(endpoint);
  },
  addReview(id: number, review: string) {
    return ApiService.put(`${endpoint}/${id}`, {
      review: "\\x" + review,
    });
  },
  deleteReview(id: number) {
    return ApiService.put(`${endpoint}/${id}`, {
      review: null,
    });
  },
};
