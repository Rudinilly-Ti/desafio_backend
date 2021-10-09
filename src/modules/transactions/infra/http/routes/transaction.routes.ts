import { Router } from "express";
import TransactionController from "../controllers/TransactionController";

const transactionRouter = Router();

transactionRouter.post("/createTransaction", TransactionController.createTransaction);

export default transactionRouter;
