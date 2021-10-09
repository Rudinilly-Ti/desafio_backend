import ICreateKeyDTO from "../dtos/ICreateKeyDTO";
import IReturnKeysDTO from "../dtos/IReturnKeysDTO";
import Key from "../infra/typeorm/entities/Key";

export default interface IKeyRepository {
  create(data: ICreateKeyDTO): Promise<Key>;
  updateValue(key: Key): Promise<Key>;
  delete(key_id: number): Promise<void>;
  findById(key_id: number): Promise<Key>
  findByValue(value: string): Promise<Key>;
  findByUser(use_id: number): Promise<IReturnKeysDTO>
}
