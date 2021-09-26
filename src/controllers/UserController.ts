import  { Request, Response } from  'express';
import { getConnection } from 'typeorm';
import { User } from "../entity/User";

export default {
  //listar usuarios
  async allUsers(req: Request, res: Response) {
    const userRepository = getConnection().getRepository(User);
    const result = await userRepository.find({relations: ['keys']});

    return res.send(result);
  },

  //buscar ususario
  async searchUser(req: Request, res: Response) {
    const userRepository = getConnection().getRepository(User);
    const { user_id } = req.params;
    const user = await userRepository.findOne(user_id, {relations: ['keys']});

    return res.send(user);
  },

  //criar usuario
  async createUser(req: Request, res: Response) {
    const userRepository =  getConnection().getRepository(User);

    const user = await userRepository.create(req.body);
    const result = await userRepository.save(user);   
    
    return res.send(result);
  },

  //atualizar usuario
  async updateUser(req: Request, res: Response) {
    const userRepository =  getConnection().getRepository(User);
    const { user_id } = req.params;
    const user = await userRepository.findOne(user_id);
    
    userRepository.merge(user, req.body);

    const result = await userRepository.save(user);
    return res.send(result);
  },

  //deletar usuario
  async deleteUser(req: Request, res: Response) {
    const userRepository =  getConnection().getRepository(User);
    
    const { user_id } = req.params;
    const result = await userRepository.delete(user_id);
    
    return res.send(result);
  }
}