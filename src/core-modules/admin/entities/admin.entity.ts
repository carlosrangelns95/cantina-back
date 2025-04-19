import { ProfileEntity } from "src/core-modules/profile/entities/profile.entity";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'admins' })
export class AdminEntity {

  @PrimaryGeneratedColumn()
  id: number;


  // um admin pode pertencer a apenas um perfil
  @OneToOne(() => ProfileEntity, (profile) => profile.admin)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

}
