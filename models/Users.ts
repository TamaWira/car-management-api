import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: number;
  username!: string;
  password!: string;
  role!: string;
  fullname!: string;

  static get tableName() {
    return "users";
  }
}

export type Users = ModelObject<UsersModel>;
