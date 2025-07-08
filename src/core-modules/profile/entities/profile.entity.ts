import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { AdminEntity } from 'src/core-modules/admin/entities/admin.entity';
import { ProfileRoleTypes } from 'src/core/shared/enums';
import { BaseEntity } from 'src/core/base.entity';

@Entity('profiles')
export class ProfileEntity extends BaseEntity {

  @Column({
    type: 'enum',
    enum: ProfileRoleTypes,
    default: ProfileRoleTypes.STUDENT,
  })
  role: ProfileRoleTypes;

  @Column()
  description: string;

  // Muitos perfis pertencem a um usuário
  @ManyToMany(() => UserEntity, (user) => user.profiles)
  users: UserEntity[];

  // um perfil pode pertencer a apenas um admin
  @OneToOne(() => AdminEntity, (admin) => admin.profile, { cascade: true, eager: true })
  admin: AdminEntity;
}
