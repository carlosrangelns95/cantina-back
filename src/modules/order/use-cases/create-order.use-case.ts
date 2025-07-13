import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/core-modules/user/entities/user.entity";
import { OrderItemEntity } from "src/modules/order-items/entities/order-item.entity";
import { ProductEntity } from "src/modules/product/entities/product.entity";


export class CreateOrderUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepo: Repository<OrderItemEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) { }

  async execute(data: CreateOrderDto, req: any) {

    const user = await this.userRepo.findOneByOrFail({ id: req['user'].userId });

    let total = 0;
    for (const item of data.items) {
      const product = await this.productRepo.findOneByOrFail({ id: item.id });
      total += (item.quantity * product.value);
    }

    let order = this.orderRepo.create({
      user: user,
      total: total,
    });

    order = await this.orderRepo.save(order);

    for (const item of data.items) {
      const product = await this.productRepo.findOneByOrFail({ id: item.id });
      const orderItem = this.orderItemRepo.create({
        orderId: order.id,
        order: order,
        name: product.name,
        quantity: item.quantity,
        price: product.value,
        product: product,
      });

      await this.orderItemRepo.save(orderItem);
    }

    return {
      message: 'Order created successfully',
      code: 201,
    };
  }
}