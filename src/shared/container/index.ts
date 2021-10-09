import { container } from 'tsyringe';

import UsersRepository from '../../modules/user/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/user/repositories/IUsersRepository';
import KeyRepository from '../../modules/keys/infra/typeorm/repositories/KeyRepository';
import IKeyRepository from '../../modules/keys/repositories/IKeyRepository';
import TransactionRepository from '../../modules/transactions/infra/typeorm/repositories/TransactionRepository';
import ITransacionRepository from '../../modules/transactions/repositories/ITransactionRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IKeyRepository>(
  'KeyRepository',
  KeyRepository
);

container.registerSingleton<ITransacionRepository>(
  'TransactionRepository',
  TransactionRepository
);
