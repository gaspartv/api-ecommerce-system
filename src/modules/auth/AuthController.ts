import { Request, Response } from "express";
import { AuthService } from "./AuthService";

export class AuthController {
  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  signin = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.signin(req.body);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno.", error });
    }
  };
}
