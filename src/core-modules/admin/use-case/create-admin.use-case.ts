import { ProfileEntity } from "src/core-modules/profile/entities/profile.entity";
import { UserEntity } from "src/core-modules/user/entities/user.entity";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { AdminEntity } from "../entities/admin.entity";
import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateAdminUseCase {

  private readonly logger = new Logger(CreateAdminUseCase.name);

  constructor(
    private readonly dataSource: DataSource,
  ) { }

  async execute(createAdminDto: CreateAdminDto) {
    this.logger.debug(`Iniciando transaction: ${CreateAdminUseCase.name}`);

    return await this.dataSource.transaction(async (manager) => {

      const user = manager.create(UserEntity, {
        email: createAdminDto.email,
        name: createAdminDto.name,
        cpf: createAdminDto.cpf,
        password_crypt: bcrypt.hashSync(createAdminDto.password, 10),
      });

      const savedUser = await manager.save(user);

      this.logger.debug(`Usuário criado com sucesso: ${savedUser.email}`);
      this.logger.debug(`Criando perfil para usuário com id ${savedUser.id}`);

      const profile = manager.create(ProfileEntity, {
        user: savedUser,
        role: createAdminDto.role,
        description: createAdminDto.description,
      });

      const savedProfile = await manager.save(profile);

      this.logger.debug(`Perfil criado com sucesso: ${savedProfile.role}`);
      this.logger.debug(`Criando metadados para perfil com credenciais ${savedProfile.role}`)

      const admin = manager.create(AdminEntity, {
        profile: savedProfile,
      });

      await manager.save(admin);

      this.logger.debug(`Metadados criados com sucesso: ${savedProfile.role}`);
      this.logger.debug(`Transação finalizada com sucesso: ${CreateAdminUseCase.name}`);

      return { message: `Admin ${savedUser.name} criado com sucesso` };

    });

  }

}