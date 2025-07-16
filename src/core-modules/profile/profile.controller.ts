import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SwaggerDocs } from '../../core/swagger/swagger_docs.decorator';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { ReadProfileDto } from './dto/read-profile.dto';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { PROFILE_SWAGGER_CONFIG } from 'src/core/swagger/profile.conf';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) { }

  @Post()
  @SwaggerDocs(PROFILE_SWAGGER_CONFIG.create)
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
  @SwaggerDocs(PROFILE_SWAGGER_CONFIG.findOne)
  findOne(@Param('id') id: string): Promise<ReadProfileDto> {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @SwaggerDocs(PROFILE_SWAGGER_CONFIG.update)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<UpdateResponseDto> {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @SwaggerDocs(PROFILE_SWAGGER_CONFIG.remove)
  remove(@Param('id') id: string): Promise<UpdateResponseDto> {
    return this.profileService.remove(id);
  }
}
