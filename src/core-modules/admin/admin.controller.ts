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
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SwaggerDocs } from 'src/core/swagger/swagger_docs.decorator';
import { SWAGGER_API_ROUTES } from 'src/core/swagger/swagger-routes.config';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FilterUserDto } from '../user/dto/filter-user.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth-guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HandleErrors } from 'src/core/decorators/error-handler.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  @SwaggerDocs(SWAGGER_API_ROUTES.admin.create)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  @HandleErrors('get all admins')
  findAll(
    @Req() req: Request,
    @Query() filters: FilterUserDto,
    @Paginate() pagination: PaginateQuery,
  ) {
    return this.adminService.findAll(filters, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
