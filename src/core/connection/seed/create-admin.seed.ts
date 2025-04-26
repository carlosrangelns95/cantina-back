import { ProfileEntity, profileEnum } from 'src/core-modules/profile/entities/profile.entity';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { AdminEntity } from 'src/core-modules/admin/entities/admin.entity';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function createAdminSeed(dataSource: DataSource) {
  const logger = new Logger(createAdminSeed.name);
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepo = queryRunner.manager.getRepository(UserEntity);
    const profileRepo = queryRunner.manager.getRepository(ProfileEntity);
    const adminRepo = queryRunner.manager.getRepository(AdminEntity);

    const existing = await userRepo.findOneBy({ email: 'carlos.rangel.ns95@gmail.com' });
    if (existing) {
      logger.debug('Admin já existe. Pulando seed.');
      await queryRunner.release();
      return;
    }

    const hashedPassword = await bcrypt.hash('S3nh4@2025', 10);

    const adminUser = userRepo.create({
      name: 'Super Admin',
      email: 'carlos.rangel.ns95@gmail.com',
      password_crypt: hashedPassword,
    });

    const savedAdmin = await userRepo.save(adminUser);

    const profile = profileRepo.create({
      user: savedAdmin,
      role: profileEnum.SUPER_ADMIN,
      description: 'Super Admin',
    });

    const savedProfile = await profileRepo.save(profile);

    const admin = adminRepo.create({
      profile: savedProfile,
    });

    await adminRepo.save(admin);

    await queryRunner.commitTransaction();
    logger.debug('Seeds executadas com sucesso.');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    logger.error('Erro ao executar seed:', error);
  } finally {
    await queryRunner.release();
  }
}
