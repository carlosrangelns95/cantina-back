import { Injectable, Query } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminUseCase } from './use-case/create-admin.use-case';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { paginate, Paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';
import { FilterUserDto } from '../user/dto/filter-user.dto';
import { PaginationService } from 'src/core/pagination/pagination.service';
import { ConfigService } from '@nestjs/config';
import { ReadUserWithProfileAdminDto } from './dto/read-admin.dto';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { ProfileRoleTypes } from 'src/core/shared/enums';
import { HandleErrors } from 'src/core/decorators/error-handler.decorator';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    const queryBuilded = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.profile', 'profile')
      .innerJoinAndSelect('profile.admin', 'admin')
      .where('profile.role = :role', { role: ProfileRoleTypes.ADMIN })
      .addOrderBy(
        'user.createdAt',
        this.configService.get('DEFAULT_SORT_ORDER'),
      )
      .cache(true);

    return await paginate(pagination, queryBuilded, {
      defaultLimit: this.configService.get('DEFAULT_LIMIT_PAGINATION'),
      sortableColumns: [
        'id',
        'name',
        'email',
        'createdAt',
        'updatedAt',
        // 'profile.id',
        // 'profile.role',
        // 'profile.description',
        // 'profile.createdAt',
        // 'profile.updatedAt',
        // 'profile.admin.id',
      ],
      filterableColumns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        'profile.id': true,
        'profile.role': true,
        'profile.description': true,
        'profile.admin.id': true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} admin`;
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string) {
    return `This action removes a #${id} admin`;
  }
}
