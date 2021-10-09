import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Key from '../../../../keys/infra/typeorm/entities/Key';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @OneToMany(type => Key, key => key.user)
  keys: Key[];

}
