import { IPagination } from "../../../common/pagination/PaginationInterface";

export interface IBusinessPagination extends IPagination {
  search?: string;
  disabled?: boolean;
}
