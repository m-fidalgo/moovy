import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export default class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bytea')
  audio: string;
}
