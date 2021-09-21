import  { Request, Response } from  'express';
import { getConnection } from 'typeorm';
import { Key } from '../entity/Key';

export default {
  //listar chaves
  async allKeys(req:Request, res:Response) {
    const keyRepository = getConnection().getRepository(Key);
    const result = await keyRepository.find({relations: ['user']});
    
    return res.send(result);
  },
  //buscar chaves
  async myKeys(req:Request, res:Response) {
    const keyRepository = getConnection().getRepository(Key);
    const { user_id } = req.params;
    const result = await keyRepository.find({ where: { user: user_id }});
    return res.send(result);
  },

  //cadastrar chave
  async createKey(req: Request, res: Response) {
    const keyRepository =  getConnection().getRepository(Key);
    const [ keys, numKeys ] = await keyRepository.findAndCount({where: { user: req.body.user }});
    const chaves = await keyRepository.find();

      if (numKeys == 3) {
        return res.send({message: "Numero de chaves maximo atingido!"});
      }else {
        const { valor } = req.body;
        var cadastrada = false;
  
        chaves.forEach( chave => {
          if (chave.valor == valor) {
            return res.send({message: "Chave ja cadastrada!"});
            cadastrada = true;
          }
        });
  
        if(!cadastrada){
          const key = await keyRepository.create(req.body);
          const result = await keyRepository.save(key);   
          
          return res.send(result);
      }  
    }   
  },

  //atualiar chave
  async updateKey(req: Request, res: Response) {
    const keyRepository =  getConnection().getRepository(Key);
    const key = await keyRepository.findOne(req.body.id);
    keyRepository.merge(key, req.body);

    const result = keyRepository.save(key);
    
    return res.send(result);
  },

  //deletar chave
  async deleteKey(req: Request, res: Response) {
    const keyRepository =  getConnection().getRepository(Key);

    const { key_id } = req.params;

    const result = await keyRepository.delete(key_id);
    return res.send(result);
  }
 
}