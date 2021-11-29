import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { MovieInterface } from '../../../data/@types/MovieInterface';
import { movieCardStyle } from './MovieCard.styles';

interface MovieProps {
  movie: MovieInterface;
  onRecord: Function;
  onRemove: Function;
}

const MovieCard: React.FC<MovieProps> = ({ movie, onRecord, onRemove }) => {
  return (
    <Card style={movieCardStyle.card}>
      <Card.Cover source={{ uri: movie.poster }} />
      <Card.Content style={movieCardStyle.content}>
        <Title>{movie.title}</Title>
      </Card.Content>
      <Card.Actions style={movieCardStyle.actions}>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default MovieCard;
