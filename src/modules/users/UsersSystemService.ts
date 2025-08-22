import { AppError } from "../../app.error";
import { UsersSystemRepository } from "../../database/repositories/UsersSystem/UsersSystemRepository";
import { UsersSystemMapper } from "./UsersSystemMapper";

export class UsersSystemService {
  protected usersRepository: UsersSystemRepository;

  constructor(usersRepository: UsersSystemRepository) {
    this.usersRepository = usersRepository;
  }

  async userOrThrow(idUser: string) {
    const user = await this.usersRepository.findById(idUser);
    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }
    return user;
  }

  async getProfile(idUser: string) {
    const user = await this.userOrThrow(idUser);
    return UsersSystemMapper.response(user);
  }
}
