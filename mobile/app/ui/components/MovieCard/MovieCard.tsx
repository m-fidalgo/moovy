import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MovieInterface } from "../../../data/@types/MovieInterface";
import { movieCardStyle } from "./MovieCard.styles";

interface MovieProps {
  item: MovieInterface;
  index: number;
  onRecord: Function;
}

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const MovieCard: React.FC<MovieProps> = ({ item, index, onRecord }) => {
  return (
    <Card style={movieCardStyle.card} key={index}>
      <Card.Cover source={{ uri: item.poster }} style={movieCardStyle.img} />
      <Card.Content style={movieCardStyle.content}>
        <Title>{item.title}</Title>
      </Card.Content>
      <Card.Actions style={movieCardStyle.actions}>
        <Button onPress={() => onRecord(item)}>
          <Icon name="mic" size={30} color="#000000" />
        </Button>
      </Card.Actions>
    </Card>
  );
};
