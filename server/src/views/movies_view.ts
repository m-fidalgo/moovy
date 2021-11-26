import Movie from '../models/Movie';
import reviewsView from './reviews_view';

export default {
  render(movie: Movie) {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      rating: movie.rating,
      review: reviewsView.render(movie.review),
    };
  },

  renderMany(movies: Movie[]) {
    return movies.map((movie) => this.render(movie));
  },
};
