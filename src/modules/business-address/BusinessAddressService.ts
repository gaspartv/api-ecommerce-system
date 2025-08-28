import { BusinessAddressesRepository } from "../../database/repositories/BusinessAddresses/BusinessAddressesRepository";
import { BusinessAddressesUpdateManyDto } from "./interfaces/BusinessAddressesUpdateDto";

export class BusinessAddressesService {
  protected businessAddressesRepository: BusinessAddressesRepository;

  constructor(businessAddressesRepository: BusinessAddressesRepository) {
    this.businessAddressesRepository = businessAddressesRepository;
  }

  async createOrUpdate(dto: BusinessAddressesUpdateManyDto) {
    return await this.businessAddressesRepository.updateMany(dto);
  }
}
