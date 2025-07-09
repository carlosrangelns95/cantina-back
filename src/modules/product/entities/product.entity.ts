import { BaseEntity } from "src/core/base.entity";
import { ProductCategory } from "src/core/shared/enums";
import { Column, Entity } from "typeorm";

@Entity('products')
export class ProductEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'float' })
    value: number;

    @Column({ type: 'varchar', length: 255 })
    category: ProductCategory;
}
