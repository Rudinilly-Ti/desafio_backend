import { Entity, Column ,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Key } from "./Key";

interface Transacao {
  id: number,
  valor: number,
  payer: number,
  receiver: number
}

@Entity()
export class Transaction implements Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  valor: number;

  @ManyToOne(type => Key, key => key.payments)
  payer: number;

  @ManyToOne(type => Key, key => key.receivements)
  receiver: number;
}