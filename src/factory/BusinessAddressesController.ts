import { BusinessAddressesRepository } from "../database/repositories/BusinessAddresses/BusinessAddressesRepository";
import { BusinessAddressesController } from "../modules/business-address/BusinessAddressController";
import { BusinessAddressesService } from "../modules/business-address/BusinessAddressService";

export class BusinessAddressesControllerFactory {
  static execute() {
    const repository = new BusinessAddressesRepository();
    const service = new BusinessAddressesService(repository);
    return new BusinessAddressesController(service);
  }
}
