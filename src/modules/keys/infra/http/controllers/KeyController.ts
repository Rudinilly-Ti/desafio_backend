import  { Request, Response } from  'express';
import { container } from 'tsyringe';
import KeyServices from '../../../services/KeyServices';

export default {
  async myKeys(req:Request, res:Response) {
    const keyRepository = container.resolve(KeyServices);

    const { user_id } = req.body;

    const keys = await keyRepository.myKeys(user_id);

    return res.json(keys);
  },

  //cadastrar chave
  async createKey(req: Request, res: Response) {
    const keyRepository = container.resolve(KeyServices);

    const key = await keyRepository.createKey(req.body);

    return res.json(key)
  },

  //atualiar chave
  async updateKey(req: Request, res: Response) {
    const keyRepository = container.resolve(KeyServices);

   const key = await keyRepository.updateKey(req.body);

   return res.json(key)
  },

  //deletar chave
  async deleteKey(req: Request, res: Response) {
    const keyRepository = container.resolve(KeyServices);

    const { key_id } = req.body;

    await keyRepository.deleteKey(key_id);

    return res.json({ message: "Key deleted." })
  }

}
