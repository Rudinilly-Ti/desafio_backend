import express from 'express';
import routes from './routes';
import { createConnection } from "typeorm";

require("dotenv").config({
  path:process.env.NODE_ENV == 'test' ? ".env.test" : ".env"
});

createConnection().then(connection => {
  const app = express();
  
  app.use(express.json());
  app.use(routes);    
  
  app.listen(process.env.PORT || 3333);
});

