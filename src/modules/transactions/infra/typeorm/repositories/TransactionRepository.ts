import { getRepository, Repository } from "typeorm";
import ICreateTransactionDTO from "../../../dtos/ICreateTransactionDTO";
import ITransactionRepository from "../../../repositories/ITransactionRepository";
import Transaction from "../entities/Transaction";

export default class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor(){
    this.ormRepository = getRepository(Transaction);
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);
    return transaction;
  }
}
