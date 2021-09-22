import express from 'express';
import routes from './routes';
import { createConnection } from "typeorm";

createConnection().then(connection => {
  const PORT = 3333;
  const HOST = '0.0.0.0';

  const app = express();
  
  app.use(express.json());
  app.use(routes);    
  
  app.listen(PORT, HOST);
});

