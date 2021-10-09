import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import '../typeorm';
import routes from './routes/routes';
import AppError from '../../errors/AppError';
import '../../container';

const app = express();

app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, Next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message
      })
    }
    console.log(err)
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
      })
  });

export default app;
