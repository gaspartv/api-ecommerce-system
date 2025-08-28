import { Request, Response } from "express";
import { UsersSystemService } from "./UsersSystemService";

export class UsersSystemController {
  protected usersSystemService: UsersSystemService;

  constructor(usersSystemService: UsersSystemService) {
    this.usersSystemService = usersSystemService;
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.id_user;
      const response = await this.usersSystemService.getProfile(userId);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno.", error });
    }
  };
}
