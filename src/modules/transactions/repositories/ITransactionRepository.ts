import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import Transaction from "../infra/typeorm/entities/Transaction";

export default interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
}
