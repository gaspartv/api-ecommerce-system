import { Request, Response } from "express";
import { BusinessAddressesService } from "./BusinessAddressService";

export class BusinessAddressesController {
  protected businessAddressesService: BusinessAddressesService;

  constructor(businessAddressesService: BusinessAddressesService) {
    this.businessAddressesService = businessAddressesService;
  }

  createOrUpdate = async (req: Request, res: Response) => {
    const response = await this.businessAddressesService.createOrUpdate(
      req.body
    );
    return res.status(200).json(response);
  };
}
