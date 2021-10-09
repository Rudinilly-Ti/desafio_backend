import { Entity, Column ,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Key from "../../../../keys/infra/typeorm/entities/Key";

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  valor: number;

  @ManyToOne(type => Key, key => key.payments)
  payer: number;

  @ManyToOne(type => Key, key => key.receivements)
  receiver: number;
}
