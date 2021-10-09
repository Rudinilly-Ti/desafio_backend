import { Router } from "express";
import KeyController from "../controllers/KeyController";

const keyRouter = Router();

keyRouter.get('/myKeys', KeyController.myKeys);
keyRouter.post('/createKey', KeyController.createKey);
keyRouter.put('/updateKey', KeyController.updateKey);
keyRouter.delete('/deleteKey', KeyController.deleteKey);

export default keyRouter;
