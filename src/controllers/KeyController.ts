import  { Request, Response } from  'express';
import { getConnection } from 'typeorm';
import { Key } from '../entity/Key';

export default {
  //listar chaves
  async allKeys(req:Request, res:Response) {
    const keyRepository = getConnection().getRepository(Key);
    const result = await keyRepository.find({relations: ['user', 'payments', 'receivements']});
    
    return res.send(result);
  },
  //buscar chaves
  async myKeys(req:Request, res:Response) {
    const keyRepository = getConnection().getRepository(Key);
    const { user_id } = req.params;
    const result = await keyRepository.find({ where: { user: user_id }, relations: ['payments', 'receivements']});
    return res.send(result);
  },

  //cadastrar chave
  async createKey(req: Request, res: Response) {
    const keyRepository =  getConnection().getRepository(Key);
    const [ keys, numKeys ] = await keyRepository.findAndCount({where: { user: req.body.user }});
    const chaves = await keyRepository.find();
    let result;

      if (numKeys == 3) {
        result = res.status(403).send({message: "Numero de chaves maximo atingido!"});
        
      } else {
        const { valor } = req.body;
        var cadastrar = true;
  
        chaves.forEach( chave => {
          if (chave.valor == valor) {
            result =  res.status(409).send({message: "Chave ja cadastrada!"});
            cadastrar = false;
          }
        });
  
        if(cadastrar){
          const key = await keyRepository.create(req.body);
          const resultado = await keyRepository.save(key);   
          
          result = res.send(resultado);
      }  
      return result;
    }   
  },

  //atualiar chave
  async updateKey(req: Request, res: Response) {
    const keyRepository =  getConnection().getRepository(Key);

    const { key_id } = req.params;
    const key = await keyRepository.findOne(key_id);

    keyRepository.merge(key, req.body);
    const result = await keyRepository.save(key);
    
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