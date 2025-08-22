import { UsersSystemRepository } from "../database/repositories/UsersSystem/UsersSystemRepository";
import { UsersSystemController } from "../modules/users/UsersSystemController";
import { UsersSystemService } from "../modules/users/UsersSystemService";

export class UsersSystemControllerFactory {
  static execute() {
    const usersSystemRepository = new UsersSystemRepository();
    const usersSystemService = new UsersSystemService(usersSystemRepository);
    return new UsersSystemController(usersSystemService);
  }
}
