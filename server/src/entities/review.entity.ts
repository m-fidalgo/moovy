import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export default class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bytea')
  audio: string;
}
