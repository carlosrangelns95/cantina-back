import { hashSync as bcryptHashSync } from 'bcrypt'
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { ViewUserDto } from '../dto/view-user.dto';
import { plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';

export class CreateUserUseCase {

  private readonly logger = new Logger(CreateUserUseCase.name, { timestamp: true });

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async execute(data: CreateUserDto): Promise<ViewUserDto> {

    const { password, ...restDto } = data;
    const passwordCrypt = bcryptHashSync(password, 10);
    
    const user = this.userRepository.create({ // isso evta conflito ao adicionat o campo password_crypt com o tipo do DTO
      ...restDto,
      password_crypt: passwordCrypt,
    })


    // criar uma forma de verificar todos os relaconamentos necessários ou criar uma transaction
    // verificar a utilização de do Logger para debug

    const savedUser = await this.userRepository.save(user)

    // so exibe  campos permitidos no view dto
    const transformed = plainToInstance(ViewUserDto, savedUser, {
      excludeExtraneousValues: true,
    });

    this.logger.debug(`create user: ${JSON.stringify(transformed)}`);

    return transformed;
  }
}