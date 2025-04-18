import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleErrors } from '../shared/error_handler.decorator';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { ViewUserDto } from './dto/view-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userUseCase: CreateUserUseCase,
  ) { }

  @HandleErrors('create user')
  async create(createUserDto: CreateUserDto): Promise<ViewUserDto> {
    return await this.userUseCase.execute(createUserDto)
  }

  @HandleErrors('get all users')
  async findAll() {
    return await this.userRepository.find();
  }

  @HandleErrors('get one user')
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  @HandleErrors('update user')
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  @HandleErrors('remove user')
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
