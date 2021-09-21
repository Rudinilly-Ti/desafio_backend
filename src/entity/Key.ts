import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from './User';
import { Transaction } from './Transaction';

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

  @OneToMany(type => Transaction, transaction => transaction.payer)
  payments: Transaction[];

  @OneToMany(type => Transaction, transaction => transaction.receiver)
  receivements: Transaction[];
}