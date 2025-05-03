import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { ReadProfileDto } from './dto/read-profile.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { ResponseRequestPaginatedDto } from 'src/core/dto/paginated-filter-response.dto';
import { PaginateQuery } from 'nestjs-paginate';
import { FilterProfileDto } from './dto/filter-profile.dto';
import { PaginationService } from 'src/core/pagination/pagination.service';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly paginationService: PaginationService,
  ) { }

  async create(createProfileDto: CreateProfileDto): Promise<CreateResponseDto> {

    const { user_id, ...restDto } = createProfileDto;
    const user = await this.userRepository.findOneOrFail({ where: { id: user_id } });

    const profile = this.profileRepository.create({
      ...restDto,
      user: user,
    });

    const savedProfile = await this.profileRepository.save(profile);

    return {
      id: savedProfile.id,
      message: 'Profile created successfully',
      code: HttpStatus.CREATED,
    };
  }

  // async findAll(
  //   filters: FilterProfileDto,
  //   pagination: PaginateQuery,
  // ): Promise<ResponseRequestPaginatedDto<ReadProfileDto>> {
  //   const likeFields = ['description'];
  //   const exactFields = ['role', 'user_id'];
  //   const queryBuilded = this.profileRepository.createQueryBuilder('profile');

  //   // campos sendo gerados dinamicamente (ex: queryBuilded.andWhere("s.nome LIKE :nome", { nome: "%ana%" });)
  //   likeFields.forEach((field) => {
  //     if (filters[field]) {
  //       queryBuilded.andWhere(`profile.${field} LIKE :${field}`, {
  //         [field]: `%${filters[field]}%`
  //       })
  //     }
  //   });

  //   exactFields.forEach((field) => {
  //     if (filters[field]) {
  //       queryBuilded.andWhere(`profile.${field} = :${field}`, {
  //         [field]: filters[field]
  //       })
  //     }
  //   });

  //   return await this.paginationService.paginateData(pagination, queryBuilded, [...likeFields, ...exactFields], ReadProfileDto);
  // }

  async findOne(id: number): Promise<ReadProfileDto> {
    const profile = await this.profileRepository.findOne({ where: { id } });

    if (!profile)
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

    const transformed = plainToInstance(ReadProfileDto, profile, {
      excludeExtraneousValues: true,
    });

    return transformed;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<UpdateResponseDto> {
    const profile = await this.profileRepository.findOneOrFail({ where: { id } });
    const updated = this.profileRepository.merge(profile, updateProfileDto);
    await this.profileRepository.save(updated);

    return {
      message: 'Profile updated successfully',
      code: HttpStatus.OK,
    };
  }

  async remove(id: number): Promise<UpdateResponseDto> {
    const deleted = await this.profileRepository.softDelete(id);
    if (!deleted)
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

    return {
      message: 'Profile removed successfully',
      code: HttpStatus.OK,
    };
  }
}
