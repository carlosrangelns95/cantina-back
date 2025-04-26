import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { paginate, PaginateConfig, PaginateQuery } from "nestjs-paginate";
import { SelectQueryBuilder } from "typeorm";
import { ResponseRequestPaginatedDto } from "../dto/response-request-paginated.dto";
import { plainToInstance } from "class-transformer";


@Injectable()
export class PaginationService {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  async paginateData<T>(
    pagination: PaginateQuery,
    queryBuilded: SelectQueryBuilder<any>,
    searchableColumns: string[],
    dto: new () => T,
  ): Promise<ResponseRequestPaginatedDto<any>> {

    const paginateConfig: PaginateConfig<any> = {
      defaultSortBy: [['created_at', this.configService.get('DEFAULT_SORT_ORDER') ?? 'DESC']],
      sortableColumns: ['created_at'],
      searchableColumns: searchableColumns,
      defaultLimit: this.configService.get('DEFAULT_LIMIT_PAGINATION'),
    };

    const result = await paginate(pagination, queryBuilded, paginateConfig);

    if (result.meta.totalItems === 0)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    const transformed = plainToInstance(dto, result.data, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformed,
      paginate: {
        currentPage: result.meta.currentPage ?? 1,
        totalItems: result.meta.totalItems ?? 0,
        totalPages: result.meta.totalPages ?? 1,
      }
    }
  }
}