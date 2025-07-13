
import { BaseEntity } from "src/core/base.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { ProductEntity } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('order_items')
export class OrderItemEntity extends BaseEntity {

    @JoinColumn({ name: 'order_id' })
    @ManyToOne(() => OrderEntity, OrderEntity => OrderEntity.orderItems)
    order: OrderEntity;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne(() => ProductEntity, product => product.orderItem, { nullable: true })
    product: ProductEntity;

    @Column({ name: 'order_id' })
    orderId: string;

    @Column({ name: 'product_id' })
    productId: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;
}
