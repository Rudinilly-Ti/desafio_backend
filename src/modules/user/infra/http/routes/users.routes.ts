import { Router } from "express";

import UserController from '../controllers/UserController';
const usersRouter = Router();

usersRouter.post('/createUser', UserController.createUser);

export default usersRouter;