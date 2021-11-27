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

  @Column('varchar', { unique: true })
  imdb_id: string;

  @Column('varchar')
  poster: string;

  @Column('int')
  year: number;

  @Column('bytea', { nullable: true })
  review: string;
}
