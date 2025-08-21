export interface IPagination {
  page: number;
  size: number;
  sort_by: string;
  order: "asc" | "desc";
}
