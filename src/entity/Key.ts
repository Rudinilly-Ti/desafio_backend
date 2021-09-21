import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';

interface Chave {
  id: number,
  valor: string,
  user: number,
}

@Entity()
export class Key implements Chave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor: string;

  @ManyToOne(type => User, user => user.keys, {
    onDelete: "CASCADE"
  })
  user: number;
}