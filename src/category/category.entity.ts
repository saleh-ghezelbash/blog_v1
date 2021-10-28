import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique:true
  })
  title: string;

  @ManyToMany(() => Post, post => post.tags)
  posts: Post[];
}