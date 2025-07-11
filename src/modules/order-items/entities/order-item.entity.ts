import { join } from "path";
import { BaseEntity } from "src/core/base.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('order_items')
export class OrderItemEntity extends BaseEntity {

    @JoinColumn({ name: 'order_id' })
    @ManyToOne(() => OrderEntity, OrderEntity => OrderEntity.orderItems)
    order: OrderEntity;

    @Column({ name: 'order_id' })
    orderId: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;
}
