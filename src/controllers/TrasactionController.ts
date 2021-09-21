import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export default {
  async createTransaction(req: Request, res: Response) {
    const transactionRepository = getConnection().getRepository(Transaction);
    const transaction = await transactionRepository.create(req.body);

    const result = await transactionRepository.save(transaction);

    return res.send(result);
  }
}