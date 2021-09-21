import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Key } from './Key';

interface Usuario {
  id: number,
  nome: String,
  telefone: String
}

@Entity()
export class User implements Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @OneToMany(type => Key, key => key.user)
  keys: Key[];
  
}