import { inject, injectable } from "tsyringe";
import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import ITransactionRepository from "../repositories/ITransactionRepository";
import Transaction from "../infra/typeorm/entities/Transaction";
import AppError from "../../../shared/errors/AppError";

@injectable()
export default class CreateTransctionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository
  ){}

  public async execute({
    valor,
    payer,
    receiver }: ICreateTransactionDTO): Promise<Transaction>{
      if(valor <= 0)
        throw new AppError("Value not allowed.")

      const transaction = await this.transactionRepository.create({ valor, payer, receiver });

      return transaction;
  }
}
