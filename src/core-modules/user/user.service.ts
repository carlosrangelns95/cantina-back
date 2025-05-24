import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleErrors } from 'src/core/decorators/error-handler.decorator';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { ReadUserDto } from './dto/read-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from 'src/core/dto/paginated-filter-response.dto';
import { PaginationService } from 'src/core/pagination/pagination.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userUseCase: CreateUserUseCase,
    private readonly paginationService: PaginationService,
    private readonly configService: ConfigService,
  ) {}

  @HandleErrors('create user')
  async create(createUserDto: CreateUserDto): Promise<CreateResponseDto> {
    return await this.userUseCase.execute(createUserDto);
  }

  @HandleErrors('get all users')
  async findAll(filters: FilterUserDto, pagination: PaginateQuery): Promise<Paginated<UserEntity>> {
    const likeFields = ['email', 'name'];

    const queryBuilded = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile');

    // campos sendo gerados dinamicamente (ex: queryBuilded.andWhere("s.nome LIKE :nome", { nome: "%rangel%" });)
    likeFields.forEach((field) => {
      if (filters[field]) {
        queryBuilded.andWhere(`user.${field} LIKE :${field}`, {
          [field]: `%${filters[field]}%`,
        });
      }
    });

    queryBuilded.cache(true);

    return await paginate(pagination, queryBuilded, {
      defaultLimit: this.configService.get('DEFAULT_LIMIT_PAGINATION'),
      sortableColumns: ['id', 'name', 'email', 'profile.role'],
      searchableColumns: ['id', 'name', 'email', 'profile.role'],
    });

  }

  @HandleErrors('get one user')
  async findOne(id: number): Promise<ReadUserDto> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    const transformed = plainToInstance(ReadUserDto, user, {
      excludeExtraneousValues: true,
    });

    return transformed;
  }

  @HandleErrors('update user')
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResponseDto> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    const { password } = updateUserDto;

    if (password) {
      const passwordCrypt = bcryptHashSync(password, 10);
      user.password_crypt = passwordCrypt;
    }

    const updated = this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(updated);

    return {
      message: 'User updated successfully',
      code: HttpStatus.OK,
    };
  }

  @HandleErrors('remove user')
  async remove(id: number): Promise<UpdateResponseDto> {
    const deleted = await this.userRepository.softDelete(id);
    if (!deleted)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return {
      message: 'User removed successfully',
      code: HttpStatus.OK,
    };
  }
}
