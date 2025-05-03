import { Injectable, Query } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminUseCase } from './use-case/create-admin.use-case';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { Repository } from 'typeorm';
import {
  Paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';
import { FilterUserDto } from '../user/dto/filter-user.dto';
import { PaginationService } from 'src/core/pagination/pagination.service';
import { ConfigService } from '@nestjs/config';
import { ReadAdminDto } from './dto/read-admin.dto';
import { ResponseRequestPaginatedDto } from 'src/core/dto/paginated-filter-response.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly paginateService: PaginationService,
    private readonly configService: ConfigService,
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    return await this.createAdminUseCase.execute(createAdminDto);
  }

  async findAll(
    @Query() filters: FilterUserDto,
    @Paginate() pagination: PaginateQuery,
  ) {
    const query = this.adminRepository
      .createQueryBuilder('admin')
      .innerJoinAndSelect('admin.profile', 'profile')
      .innerJoinAndSelect('profile.user', 'user')
      .addOrderBy(
        'user.createdAt',
        this.configService.get('DEFAULT_SORT_ORDER'),
      );

    const config: PaginateConfig<AdminEntity> = {
      defaultLimit: this.configService.get('DEFAULT_LIMIT_PAGINATION'),
      sortableColumns: ['id'], // Manter apenas colunas simples
      filterableColumns: {},
    };

    // return await paginate<AdminEntity>(pagination, query, config);
    return await this.paginateService.paginateData(
      pagination,
      query,
      ReadAdminDto,
      config,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
