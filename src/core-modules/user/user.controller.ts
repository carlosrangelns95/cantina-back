import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SwaggerDocs } from '../../core/swagger/swagger_docs.decorator';
import { SWAGGER_API_ROUTES } from '../../core/swagger/swagger-routes.config';
import { ReadUserDto } from './dto/read-user.dto';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { UpdateResponseDto } from 'src/core/dto/update-response.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FilterUserDto } from './dto/filter-user.dto';
import { PaginatedResponse } from 'src/core/dto/paginated-filter-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth } from '@nestjs/swagger';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { USER_SWAGGER_CONFIG } from 'src/core/swagger/user.conf';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @SwaggerDocs(USER_SWAGGER_CONFIG.create)
  create(@Body() createUserDto: CreateUserDto): Promise<CreateResponseDto> {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiBasicAuth()
  @Get()
  findAll(
    @Query() filters: FilterUserDto,
    @Paginate() pagination: PaginateQuery,
  ): Promise<Paginated<UserEntity>>  {
    return this.userService.findAll(filters, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReadUserDto> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SwaggerDocs(SWAGGER_API_ROUTES.users.remove)
  remove(@Param('id') id: string): Promise<UpdateResponseDto> {
    return this.userService.remove(id);
  }
}
