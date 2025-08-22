import { UsersSystemRepository } from "../database/repositories/UsersSystem/UsersSystemRepository";
import { AuthController } from "../modules/auth/AuthController";
import { AuthService } from "../modules/auth/AuthService";

export class AuthControllerFactory {
  static execute() {
    const usersRepository = new UsersSystemRepository();
    const authService = new AuthService(usersRepository);
    return new AuthController(authService);
  }
}
