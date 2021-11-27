import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

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

  @Column('bytea', { nullable: true })
  review: string;
}
