import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { CreateAdminUseCase } from './use-case/create-admin.use-case';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { PaginationService } from 'src/core/pagination/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, UserEntity, ProfileEntity]),
    UserModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, CreateAdminUseCase, PaginationService],
})
export class AdminModule { }
