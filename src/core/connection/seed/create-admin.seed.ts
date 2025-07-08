import { ProfileEntity } from 'src/core-modules/profile/entities/profile.entity';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { AdminEntity } from 'src/core-modules/admin/entities/admin.entity';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ProfileRoleTypes } from 'src/core/shared/enums';

export async function createAdminSeed(dataSource: DataSource) {
  const logger = new Logger(createAdminSeed.name, { timestamp: true });
  const queryRunner = dataSource.createQueryRunner();

  logger.debug('starting transaction...');
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    logger.debug('instantiating repositories...');
    const userRepo = queryRunner.manager.getRepository(UserEntity);
    const profileRepo = queryRunner.manager.getRepository(ProfileEntity);
    const adminRepo = queryRunner.manager.getRepository(AdminEntity);

    const existing = await userRepo.findOneBy({ email: 'admin@admin.com' });
    if (existing) {
      logger.debug('admin already exists. Skipping seed...');
      await queryRunner.release();
      return;
    }

    logger.debug('encrypting password...');
    const hashedPassword = await bcrypt.hash('S3nh4@2025', 10);
    
    logger.debug('finding admin profile...');
    const profile = await profileRepo.findOneOrFail({ where: { role: ProfileRoleTypes.ADMIN } });

    const adminUser = userRepo.create({    
      name: 'Administrador',
      email: 'admin@admin.com',
      password_crypt: hashedPassword,
      profiles: [profile],
    });

    logger.debug('saving user...');
    await userRepo.save(adminUser);

    await queryRunner.commitTransaction();
    logger.debug('seeds executed successfully.');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    logger.error('error executing seed:', error);
  } finally {
    await queryRunner.release();
  }
}
