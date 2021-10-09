import { inject, injectable } from "tsyringe";
import IKeyRepository from "../repositories/IKeyRepository";
import ICreateKeyDTO from "../dtos/ICreateKeyDTO";
import Key from "../infra/typeorm/entities/Key";
import AppError from "../../../shared/errors/AppError";

@injectable()
export default class KeyServices {
  constructor(
    @inject('KeyRepository')
    private keyRepository: IKeyRepository
    ) {}

  public async createKey({ valor , user }: ICreateKeyDTO): Promise<Key> {
    const userKeys = await this.keyRepository.findByUser(user);

    if(userKeys.numKeys == 3)
      throw new AppError("Max number of keys reached.", 401);

    userKeys.keys.forEach(key => {
      if(key.valor == valor)
        throw new AppError("Key already exists.", 401);
    });

    const key = await this.keyRepository.create({  valor, user });

    return key;
  }

  public async updateKey(newKey: Key): Promise<Key> {
    const key = await this.keyRepository.findById(newKey.id);

    if(!key)
      throw new AppError("Key not found.");

    const updatedKey = await this.keyRepository.updateValue(newKey);
    return updatedKey;
  }

  public async myKeys(user_id: number): Promise<Key[]> {
    const { keys, numKeys } = await this.keyRepository.findByUser(user_id);

    if(!numKeys)
      throw new AppError("User doesn't have any key.");

    return keys;
  }

  public async deleteKey(key_id: number): Promise<any> {
    const key = await this.keyRepository.findById(key_id);

    if(!key)
      throw new AppError("Key not found.")

    await this.keyRepository.delete(key_id);
  }
}
