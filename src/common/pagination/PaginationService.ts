import { IPagination } from "./PaginationInterface";
import { PaginationResponse } from "./PaginationResponse";

export class PaginationService {
  static paginate(pagination: IPagination): string {
    const {
      page = 1,
      size = 10,
      sort_by = "created_at",
      order = "desc",
    } = pagination;
    const offset = (page - 1) * size;
    const limit = size;
    return `ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset}`;
  }

  static result<T>(
    query: IPagination,
    total: number,
    columns: string[],
    entities: T[]
  ): PaginationResponse<T> {
    const {
      page = 1,
      size = 10,
      sort_by = "created_at",
      order = "desc",
    } = query;

    return {
      page,
      size,
      sort_by,
      order,
      total,
      has_more: page * size < total,
      prev_page: page > 1 ? page - 1 : null,
      next_page: page * size < total ? page + 1 : null,
      last_page: Math.ceil(total / size),
      columns,
      data: entities,
    };
  }
}
