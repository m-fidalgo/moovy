import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Review from './Review';

@Entity('movies')
export default class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  poster: string;

  @Column('double')
  rating: number;

  @OneToOne(() => Review, (review) => review.movie, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  review: Review;
}
