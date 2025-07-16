import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SwaggerDocs } from 'src/core/swagger/swagger_docs.decorator';
import { SWAGGER_API_ROUTES } from 'src/core/swagger/swagger-routes.config';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FilterUserDto } from '../user/dto/filter-user.dto';
import { Request } from 'express';
import { HandleErrors } from 'src/core/decorators/error-handler.decorator';
import { ADMIN_SWAGGER_CONFIG } from 'src/core/swagger/admin.conf';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  @SwaggerDocs(ADMIN_SWAGGER_CONFIG.create)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @HandleErrors('get all admins')
  @SwaggerDocs(ADMIN_SWAGGER_CONFIG.findAll)
  findAll(
    @Req() req: Request,
    @Query() filters: FilterUserDto,
    @Paginate() pagination: PaginateQuery,
  ) {
    return this.adminService.findAll(filters, pagination);
  }

  @Get(':id')
  @SwaggerDocs(ADMIN_SWAGGER_CONFIG.findOne)
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @SwaggerDocs(ADMIN_SWAGGER_CONFIG.update)
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @SwaggerDocs(ADMIN_SWAGGER_CONFIG.remove)
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
