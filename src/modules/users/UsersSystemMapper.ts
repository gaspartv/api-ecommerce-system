import { UsersSystemResponseInterface } from "./interfaces/UsersSystemResponseInterface";

export class UsersSystemMapper {
  static response(
    userSystem: UsersSystemResponseInterface
  ): Omit<UsersSystemResponseInterface, "password"> {
    return {
      id: userSystem.id,
      email: userSystem.email,
    };
  }
}
