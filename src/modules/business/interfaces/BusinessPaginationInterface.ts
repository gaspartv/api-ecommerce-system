import { IPagination } from "../../../common/pagination/PaginationInterface";

export interface IBusinessPagination extends IPagination {
  id?: string;
  code?: string;
  search?: string;
  disabled?: boolean;
}
