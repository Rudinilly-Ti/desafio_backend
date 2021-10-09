import { Router } from 'express';
import usersRouter from '../../../../modules/user/infra/http/routes/users.routes';
import keyRouter from '../../../../modules/keys/infra/http/routes/key.routes';
import transactionRouter from '../../../../modules/transactions/infra/http/routes/transaction.routes';

const routes = Router();

routes.use("/user", usersRouter);
routes.use("/key", keyRouter);
routes.use("/transaction", transactionRouter);



export default routes;
