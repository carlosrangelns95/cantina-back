import { BaseEntity } from "src/core/base.entity";
import { ProductCategory } from "src/core/shared/enums";
import { OrderItemEntity } from "src/modules/order-items/entities/order-item.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('products')
export class ProductEntity extends BaseEntity {

    @OneToMany(() => OrderItemEntity, OrderItem => OrderItem.product)
    orderItem: OrderItemEntity[];

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'float' })
    value: number;

    @Column({ type: 'varchar', length: 255 })
    category: ProductCategory;
}
