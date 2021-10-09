import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTransctionService from '../../../services/CreateTransactionService';

export default {
  async createTransaction(req: Request, res: Response) {
    const transactionRepository = container.resolve(CreateTransctionService)
    const transaction = await transactionRepository.execute(req.body);

    return res.send(transaction);
  }
}
