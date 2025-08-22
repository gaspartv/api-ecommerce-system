import { UsersSystemResponseInterface } from "../../../modules/users/interfaces/UsersSystemResponseInterface";
import db from "../../db";

export class UsersSystemRepository {
  findByEmail(email: string): Promise<UsersSystemResponseInterface | null> {
    return db.oneOrNone("SELECT * FROM users_system WHERE email = $1", [email]);
  }

  findById(id: string): Promise<UsersSystemResponseInterface | null> {
    return db.oneOrNone("SELECT * FROM users_system WHERE id = $1", [id]);
  }
}
