import { Request, Response } from "express";
import { BusinessAddressesService } from "./BusinessAddressService";

export class BusinessAddressesController {
  protected businessAddressesService: BusinessAddressesService;

  constructor(businessAddressesService: BusinessAddressesService) {
    this.businessAddressesService = businessAddressesService;
  }

  createOrUpdate = async (req: Request, res: Response) => {
    try {
      const response = await this.businessAddressesService.createOrUpdate(
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno.", error });
    }
  };
}
