import { AppError } from "../../app.error";
import { PaginationService } from "../../common/pagination/PaginationService";
import { BusinessesRepository } from "../../database/repositories/Businesses/BusinessesRepository";
import { BusinessesCreateDto } from "./interfaces/BusinessesCreateDto";
import { BusinessesResponseDto } from "./interfaces/BusinessesResponseDto";
import { BusinessesUpdateDto } from "./interfaces/BusinessesUpdateDto";
import { IBusinessPagination } from "./interfaces/BusinessPaginationInterface";

export class BusinessService {
  protected businessesRepository: BusinessesRepository;

  constructor(businessesRepository: BusinessesRepository) {
    this.businessesRepository = businessesRepository;
  }

  async create(dto: BusinessesCreateDto): Promise<BusinessesResponseDto> {
    const businessExists = await this.businessesRepository.findByName(dto.name);
    if (businessExists) {
      throw new AppError("Empresa com este nome já existe.", 400);
    }

    return await this.businessesRepository.create(dto);
  }

  async update(dto: BusinessesUpdateDto): Promise<BusinessesResponseDto> {
    const business = await this.businessesRepository.update(dto);
    if (!business) {
      throw new AppError("Empresa não encontrada.", 404);
    }

    return business;
  }

  async get(query: IBusinessPagination) {
    if (query.id) {
      return await this.businessesRepository.findById(query.id);
    }

    const handledQueryOptions = PaginationService.paginate(query);
    let handleQueryWhere = "";

    if (query.code) {
      handleQueryWhere = `AND code = '${query.code}'`;
    }

    if (query.search) {
      handleQueryWhere = `AND (name ILIKE '%${query.search}%' OR code ILIKE '%${query.search}%')`;
    }

    if (query.disabled !== undefined) {
      handleQueryWhere = `AND disabled = ${query.disabled}`;
    }

    const { businesses, total } = await this.businessesRepository.get(
      handledQueryOptions,
      handleQueryWhere
    );

    const columns = [
      "code",
      "created_at",
      "updated_at",
      "deleted_at",
      "disabled",
      "name",
    ];

    return PaginationService.result<BusinessesResponseDto>(
      query,
      total,
      columns,
      businesses
    );
  }
}
