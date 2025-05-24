import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { AdminEntity } from 'src/core-modules/admin/entities/admin.entity';
import { ProfileRoleTypes } from 'src/core/shared/enums';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ProfileRoleTypes,
    default: ProfileRoleTypes.USER,
  })
  role: ProfileRoleTypes;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // Muitos perfis pertencem a um usuário
  @ManyToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // um perfil pode pertencer a apenas um admin
  @OneToOne(() => AdminEntity, (admin) => admin.profile, { cascade: true, eager: true })
  admin: AdminEntity;
}
