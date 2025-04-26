export class ResponseRequestPaginatedDto<T> {
  data: T[];
  paginate: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }
}