import React, { useState, useRef, Component } from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import { MovieCard, ITEM_WIDTH, SLIDER_WIDTH } from "../MovieCard/MovieCard";

interface MovieCarouselProps {
  movies: MovieInterface[];
  onRecord: Function;
  onPlay: Function;
  onDelete: Function;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  onRecord,
  onPlay,
  onDelete,
}) => {
  const [index, setIndex] = useState<number>(0);
  const carouselRef = useRef<Carousel<MovieInterface>>(null);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={carouselRef}
        data={movies}
        renderItem={({ item, index }) => (
          <MovieCard
            item={item}
            index={index}
            onRecord={onRecord}
            onPlay={onPlay}
            onDelete={onDelete}
          />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={movies.length}
        activeDotIndex={index}
        carouselRef={carouselRef as any}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        tappableDots={true}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};
