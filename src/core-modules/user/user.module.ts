import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { PaginationService } from 'src/core/pagination/pagination.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, CreateUserUseCase, PaginationService],
  exports: [UserService],
})
export class UserModule {}
