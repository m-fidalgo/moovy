import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { movieCardStyle } from "./MovieCard.styles";

interface MovieProps {
  item: MovieInterface;
  index: number;
  onRecord: Function;
  onPlay: Function;
  onDelete: Function;
}

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const MovieCard: React.FC<MovieProps> = ({
  item,
  index,
  onRecord,
  onPlay,
  onDelete,
}) => {
  return (
    <Card style={movieCardStyle.card} key={index}>
      <Card.Cover source={{ uri: item.poster }} style={movieCardStyle.img} />
      <Card.Content style={movieCardStyle.content}>
        <Title>{item.title}</Title>
      </Card.Content>

      {item.review === null ? (
        <Card.Actions style={movieCardStyle.withoutReview}>
          <ButtonIcon
            onPress={() => onRecord(item)}
            name="mic-none"
            size={30}
            color="#000000"
            backgroundColor="#6CD3AE"
          />
        </Card.Actions>
      ) : (
        <Card.Actions style={movieCardStyle.withReview}>
          <ButtonIcon
            onPress={() => onPlay(item.review)}
            name="play-arrow"
            size={30}
            color="#000000"
            backgroundColor="#A1A1A1"
            circle
          />
          <ButtonIcon
            onPress={() => onDelete(item)}
            name="delete"
            size={30}
            color="#000000"
            backgroundColor="#FE6D8E"
            circle
          />
        </Card.Actions>
      )}
    </Card>
  );
};
