import { hashSync as bcryptHashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { HttpStatus, Logger } from '@nestjs/common';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';

export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(data: CreateUserDto): Promise<CreateResponseDto> {
    const { password, ...restDto } = data;
    const passwordCrypt = bcryptHashSync(password, 10);
    const user = this.userRepository.create({
      // isso evita conflito ao adicionar o campo password_crypt com o tipo do DTO
      ...restDto,
      password_crypt: passwordCrypt,
    });

    // criar uma forma de verificar todos os relacionamentos necessários ou criar uma transaction
    // verificar a utilização de do Logger para debug

    const savedUser = await this.userRepository.save(user);
    this.logger.debug(`create user: ${JSON.stringify(savedUser)}`);

    return {
      id: savedUser.id,
      message: 'User created successfully',
      code: HttpStatus.CREATED,
    };
  }
}
