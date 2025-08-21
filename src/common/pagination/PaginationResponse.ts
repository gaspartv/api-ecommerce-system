export interface PaginationResponse<T> {
  page: number;
  size: number;
  sort_by: string;
  order: "asc" | "desc";
  total: number;
  has_more: boolean;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  columns: string[];
  data: T[];
}
