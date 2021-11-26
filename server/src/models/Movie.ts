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

  @Column('decimal')
  rating: number;

  @OneToOne(() => Review, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinColumn()
  review: Review;
}
