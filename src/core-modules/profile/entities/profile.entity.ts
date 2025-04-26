import { UserEntity } from "src/core-modules/user/entities/user.entity";
import { AdminEntity } from "src/core-modules/admin/entities/admin.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileRoleTypes } from "src/core/shared/enums";

@Entity('profiles')
export class ProfileEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProfileRoleTypes, default: ProfileRoleTypes.USER })
  role: ProfileRoleTypes;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;


  // Muitos perfis pertencem a um usuário
  @ManyToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;


  // um perfil pode pertencer a apenas um admin
  @OneToOne(() => AdminEntity, (admin) => admin.profile, { cascade: true })
  admin: AdminEntity;
}
