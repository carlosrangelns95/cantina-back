import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SwaggerDocs } from '../../core/swagger/swagger_docs.decorator';
import { SWAGGER_API_ROUTES } from '../../core/swagger/swagger-routes.config';
import { ReadUserDto } from './dto/read-user.dto';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FilterUserDto } from './dto/filter-user.dto';
import { ResponseRequestPaginatedDto } from 'src/core/dto/paginated-filter-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @SwaggerDocs(SWAGGER_API_ROUTES.users.create)
  create(@Body() createUserDto: CreateUserDto): Promise<CreateResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() filters: FilterUserDto,
    @Paginate() pagination: PaginateQuery,
  ): Promise<ResponseRequestPaginatedDto<ReadUserDto>> {
    return this.userService.findAll(filters, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ReadUserDto> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @SwaggerDocs(SWAGGER_API_ROUTES.users.remove)
  remove(@Param('id') id: number): Promise<UpdateResponseDto> {
    return this.userService.remove(+id);
  }
}
