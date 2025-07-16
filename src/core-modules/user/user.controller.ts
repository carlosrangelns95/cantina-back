import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SwaggerDocs } from '../../core/swagger/swagger_docs.decorator';
import { ReadUserDto } from './dto/read-user.dto';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { USER_SWAGGER_CONFIG } from 'src/core/swagger/user.conf';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @SwaggerDocs(USER_SWAGGER_CONFIG.create)
  create(@Body() createUserDto: CreateUserDto): Promise<CreateResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @SwaggerDocs(USER_SWAGGER_CONFIG.findAll)
  findAll(
    @Query() filters: FilterUserDto,
    @Paginate() pagination: PaginateQuery,
  ): Promise<Paginated<UserEntity>> {
    return this.userService.findAll(filters, pagination);
  }

  @Get(':id')
  @SwaggerDocs(USER_SWAGGER_CONFIG.findOne)
  findOne(@Param('id') id: string): Promise<ReadUserDto> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @SwaggerDocs(USER_SWAGGER_CONFIG.update)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SwaggerDocs(USER_SWAGGER_CONFIG.remove)
  remove(@Param('id') id: string): Promise<UpdateResponseDto> {
    return this.userService.remove(id);
  }
}
