import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { PaginatedResponse } from '../dto/paginated-filter-response.dto';

@Injectable()
export class PaginationService {
  constructor(private readonly configService: ConfigService) {}

  async paginateData<T>(
    pagination: PaginateQuery,
    queryBuilded: SelectQueryBuilder<any>,
    sortableColumns: string[],
  ): Promise<PaginatedResponse<any>> {
    const config: PaginateConfig<any> = {
      defaultLimit: this.configService.get('DEFAULT_LIMIT_PAGINATION'),
      sortableColumns: sortableColumns,
      searchableColumns: sortableColumns
    };
    const result = await paginate(pagination, queryBuilded, config);

    if (result.meta.totalItems === 0)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return {
      data: result.data,
      paginate: {
        currentPage: result.meta.currentPage ?? 1,
        totalItems: result.meta.totalItems ?? 0,
        totalPages: result.meta.totalPages ?? 1,
      },
    };
  }
}
