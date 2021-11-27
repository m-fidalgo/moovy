import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import ReviewEntity from './review.entity';

@Entity('movies')
export default class MovieEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  poster: string;

  @Column('decimal')
  rating: number;

  @OneToOne(() => ReviewEntity, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinColumn()
  review: ReviewEntity;
}
