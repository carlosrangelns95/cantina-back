import { ProfileEntity } from 'src/core-modules/profile/entities/profile.entity';
import { ProfileRoleTypes } from 'src/core/shared/enums';
import { DataSource, Repository } from 'typeorm';

export async function seedProfiles(dataSource: DataSource) {
  const profileRepo: Repository<ProfileEntity> =
    dataSource.getRepository(ProfileEntity);
  const genders = [
    {
      role: ProfileRoleTypes.ADMIN,
      description: "Administrador do sistema"
    },
    {
      role: ProfileRoleTypes.STUDENT,
      description: "Aluno do curso",
    },
    {
      role: ProfileRoleTypes.RESPONSABLE,
      description: "Responsável do curso",
    },
  ];

  try {
    const existingGenders = await profileRepo.find();
    if (existingGenders.length > 0) {
      console.log('profiles already exists. Skipping seed...');
      return;
    }

    const profileEntities = genders.map((profile) =>
      profileRepo.create(profile),
    );

    await profileRepo.save(profileEntities);
    console.log('Profiles saved successfully!');
  } catch (error) {
    console.error('Error saving profiles:', error);
    throw error;
  }
}
