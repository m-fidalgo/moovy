import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Movie from './Movie';

@Entity('reviews')
export default class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bytea')
  audio: string;

  @OneToOne(() => Movie, (movie) => movie.review)
  movie: Movie;
}
