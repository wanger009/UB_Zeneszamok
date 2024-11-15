import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  length: number;

  @Column()
  price: number;

  @Column({ default: 0 })
  rating: number;
}