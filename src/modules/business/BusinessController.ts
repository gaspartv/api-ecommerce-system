import { Request, Response } from "express";
import { BusinessService } from "./BusinessService";

export class BusinessController {
  protected businessService: BusinessService;

  constructor(businessService: BusinessService) {
    this.businessService = businessService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const response = await this.businessService.create(req.body);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno.", error });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const response = await this.businessService.update(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno.", error });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const query: any = req.query;
      const response = await this.businessService.get(query);
      console.log("response: ", response);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno.", error });
    }
  };
}
