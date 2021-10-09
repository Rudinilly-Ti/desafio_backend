import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import User from "../../../../user/infra/typeorm/entities/User";
import Transaction from "../../../../transactions/infra/typeorm/entities/Transaction";

@Entity()
export default class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor: string;

  @ManyToOne(type => User, user => user.keys)
  user: number;

  @OneToMany(type => Transaction, transaction => transaction.payer)
  payments: Transaction[];

  @OneToMany(type => Transaction, transaction => transaction.receiver)
  receivements: Transaction[];
}
