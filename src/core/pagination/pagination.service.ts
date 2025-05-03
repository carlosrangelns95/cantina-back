import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { paginate, PaginateConfig, PaginateQuery } from "nestjs-paginate";
import { SelectQueryBuilder } from "typeorm";
import { ResponseRequestPaginatedDto } from "../dto/paginated-filter-response.dto";
import { plainToInstance } from "class-transformer";


@Injectable()
export class PaginationService {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  async paginateData<T>(
    pagination: PaginateQuery,
    queryBuilded: SelectQueryBuilder<any>,
    dto: new () => T,
    config: PaginateConfig<any>,
  ): Promise<ResponseRequestPaginatedDto<any>> {

    const result = await paginate(pagination, queryBuilded, config);
    console.log(result.data);

    if (result.meta.totalItems === 0)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return {
      data: plainToInstance(dto, result.data, { excludeExtraneousValues: true }),
      paginate: {
        currentPage: result.meta.currentPage ?? 1,
        totalItems: result.meta.totalItems ?? 0,
        totalPages: result.meta.totalPages ?? 1,
      }
    }
  }
}
