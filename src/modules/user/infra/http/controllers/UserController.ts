import  { Request, Response } from  'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUsersService';

export default {
  async createUser(req: Request, res: Response) {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(req.body)

    return res.send(user);
  }
}
