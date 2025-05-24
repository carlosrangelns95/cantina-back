export class PaginatedResponse<T> {
  data: T[];
  paginate: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
