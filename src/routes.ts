import { Router } from 'express';
import UserController from './controllers/UserController';
import KeyController from './controllers/KeyController';
import TrasactionController from './controllers/TrasactionController';
const routes = Router();

//Rotas do usuario
routes.get('/users', UserController.allUsers);
routes.get('/user/:user_id', UserController.searchUser);
routes.post('/createUser', UserController.createUser);
routes.post('/updateUser', UserController.updateUser);
routes.delete('/deleteUser/:user_id', UserController.deleteUser);

//Rota das chaves
routes.get('/keys', KeyController.allKeys);
routes.get('/keys/:user_id', KeyController.myKeys);
routes.post('/createkey', KeyController.createKey);
routes.post('/updateKey', KeyController.updateKey);
routes.delete('/deleteKey/:key_id',KeyController.deleteKey);

//Rota das transações
routes.post('/createTransaction', TrasactionController.createTransaction);


export default routes;