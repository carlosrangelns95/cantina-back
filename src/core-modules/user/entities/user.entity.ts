import { ProfileEntity } from 'src/core-modules/profile/entities/profile.entity';
import { BaseEntity } from 'src/core/base.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_crypt' })
  password_crypt: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => OrderEntity, Order => Order.user)
  orders: OrderEntity[];

  @ManyToMany(() => ProfileEntity, (profile) => profile.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'users_profiles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
    },
  })
  profiles: ProfileEntity[];
}
