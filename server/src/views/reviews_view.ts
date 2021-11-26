import Review from '../models/Review';

export default {
  render(review: Review) {
    return {
      id: review.id,
      audio: review.audio,
    };
  },
};
