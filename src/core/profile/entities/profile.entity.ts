import { UserEntity } from "src/core/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum profileEnum {
  'USER' = 'user',
  'ADMIN' = 'admin',
  'SUPER_ADMIN' = 'super_admin',
};

@Entity('profiles')
export class ProfileEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: profileEnum, default: profileEnum.USER })
  role: profileEnum;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;


  // Muitos perfis pertencem a um usuário
  @ManyToOne(() => UserEntity, (user) => user.profile, { cascade: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
