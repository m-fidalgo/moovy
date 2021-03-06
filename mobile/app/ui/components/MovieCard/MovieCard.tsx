import * as React from "react";
import { Dimensions, Text } from "react-native";
import { Card, Title } from "react-native-paper";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { movieCardStyle } from "./MovieCard.styles";
import { MovieProps } from "./MovieCard.types";

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
        <Title style={movieCardStyle.title}>{item.title}</Title>
        {!item.is_synched && (
          <Text style={movieCardStyle.pending}>Pending...</Text>
        )}
      </Card.Content>

      {item.is_synched && (
        <>
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
                onPress={() => onPlay(item)}
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
        </>
      )}
    </Card>
  );
};
