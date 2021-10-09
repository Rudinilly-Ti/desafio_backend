import Key from "../infra/typeorm/entities/Key";

export default interface IReturnKeysDTO {
  keys: Key[]
  numKeys: number
}
