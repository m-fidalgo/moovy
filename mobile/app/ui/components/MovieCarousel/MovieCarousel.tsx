import React, { useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { MovieInterface } from '../../../data/@types/MovieInterface';
import MovieCard from '../MovieCard/MovieCard';

interface MovieCarouselProps {
  movies: MovieInterface[];
  onRecord: Function;
  onRemove: Function;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  onRecord,
  onRemove,
}) => {
  return (
    <Carousel
      ref={(c) => useRef(c)}
      data={movies}
      renderItem={({ item, index }) => {
        return (
          <MovieCard movie={item} onRecord={onRecord} onRemove={onRemove} />
        );
      }}
      itemWidth={400}
      sliderWidth={400}
    />
  );
};
