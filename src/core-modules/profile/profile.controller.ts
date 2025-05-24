import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SwaggerDocs } from '../../core/swagger/swagger_docs.decorator';
import { SWAGGER_API_ROUTES } from '../../core/swagger/swagger-routes.config';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { ReadProfileDto } from './dto/read-profile.dto';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FilterProfileDto } from './dto/filter-profile.dto';
import { PaginatedResponse } from 'src/core/dto/paginated-filter-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) { }

  @Post()
  @SwaggerDocs(SWAGGER_API_ROUTES.profiles.create)
  create(@Body() createProfileDto: CreateProfileDto): Promise<CreateResponseDto> {
    return this.profileService.create(createProfileDto);
  }

  // @Get()
  // @SwaggerDocs(SWAGGER_API_ROUTES.profiles.getAll)
  // findAll(
  //   @Query() filters: FilterProfileDto,
  //   @Paginate() pagination: PaginateQuery,
  // ): Promise<ResponseRequestPaginatedDto<ReadProfileDto>> {
  //   return this.profileService.findAll(filters, pagination);
  // }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ReadProfileDto> {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @SwaggerDocs(SWAGGER_API_ROUTES.profiles.update)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<UpdateResponseDto> {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<UpdateResponseDto> {
    return this.profileService.remove(id);
  }
}
