import { hashSync as bcryptHashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CreateResponseDto } from 'src/core/dto/create-response.dto';
import { ProfileEntity } from 'src/core-modules/profile/entities/profile.entity';

export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async execute(data: CreateUserDto): Promise<CreateResponseDto> {
    this.logger.debug(`starting transaction while creating user with profile...`);
    return await this.userRepo.manager.transaction(async (manager) => {
      try {
        const { password, ...restDto } = data;
        const passwordCrypt = bcryptHashSync(password, 10);

        this.logger.debug(`searching for profile with role: ${data.category}...`);
        const profile = await manager.findOneOrFail(ProfileEntity, {
          where: { role: data.category },
        });

        this.logger.debug(`creating user with profile...`);
        const user = manager.create(UserEntity, {
          ...restDto,
          password_crypt: passwordCrypt,
          profiles: [profile],
        });


        const savedUser = await manager.save(user);
        this.logger.debug(`create user: ${JSON.stringify(savedUser)}`);

        return {
          id: savedUser.id,
          message: 'User created successfully',
          code: HttpStatus.CREATED,
        };
      } catch (error) {
        this.logger.error(`Erro ao criar o usuário: ${error}`);
        throw new HttpException('Erro ao criar o usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    });
  }
}
