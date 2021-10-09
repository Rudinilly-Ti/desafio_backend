import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import User from '../infra/typeorm/entities/User';

interface IRequest {
  nome: string
  telefone: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
    ) {}

  public async execute({ nome, telefone }:IRequest): Promise<User> {
    const user = await this.userRepository.create({nome, telefone});

    return user;
  }
}


export default CreateUserService;
