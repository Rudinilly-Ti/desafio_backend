import { getRepository, Repository } from "typeorm";
import IUsersRepository from "../../../repositories/IUsersRepository";
import ICreateUserDTO from '../../../dtos/ICreateUserDTO'
import User from "../entities/User";

export default class UserRepository implements IUsersRepository{
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}
