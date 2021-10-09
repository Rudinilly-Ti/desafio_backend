import { getRepository, Repository } from "typeorm";
import ICreateKeyDTO from "../../../dtos/ICreateKeyDTO";
import IKeyRepository from "../../../repositories/IKeyRepository";
import IReturnKeysDTO from "../../../dtos/IReturnKeysDTO";
import Key from "../entities/Key";



export default class KeyRepository implements IKeyRepository {
  private ormRepository: Repository<Key>

  constructor(){
    this.ormRepository = getRepository(Key);
  }

  public async findById(key_id: number): Promise<Key> {
    const key = await this.ormRepository.findOne(key_id, {
      relations: ['payments', 'receivements']
    });

    return key;
  }

  public async findByValue(value: string): Promise<Key> {
    const key = await this.ormRepository.findOne({
      where: {
        valor: value
      },
      relations: ['payments', 'receivements']
    });

    return key;
  }

  public async findByUser(user_id: number): Promise<IReturnKeysDTO> {
    const [keys, numKeys] = await this.ormRepository.findAndCount({
      where: {
        user: user_id
      },
      relations: ['payments', 'receivements']
    });

    return {
      keys,
      numKeys
    };
  }

  public async create({valor, user}: ICreateKeyDTO): Promise<Key> {
    const key = this.ormRepository.create({ valor, user });
    await this.ormRepository.save(key);

    return key;
  }

  public async updateValue(key: Key): Promise<Key> {
    return await this.ormRepository.save(key);
  }

  public async delete(key_id: number): Promise<void> {
    await this.ormRepository.delete(key_id)
  }
}
