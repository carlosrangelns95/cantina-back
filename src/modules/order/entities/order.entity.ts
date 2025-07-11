import { UserEntity } from "src/core-modules/user/entities/user.entity";
import { BaseEntity } from "src/core/base.entity";
import { OrderItemEntity } from "src/modules/order-items/entities/order-item.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('orders')
export class OrderEntity extends BaseEntity {

    @OneToMany(() => OrderItemEntity, OrderItem => OrderItem.order)
    orderItems: OrderItemEntity[];

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserEntity, User => User.orders)
    user: UserEntity;

    @Column({ name: 'user_id' })
    userId: string;
}
