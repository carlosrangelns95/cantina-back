import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderStatus } from "src/core/shared/enums";

export class CompleteOrderUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) { }

  async execute(id: string) {
    const order = await this.orderRepo.findOneOrFail({ where: { id } });
    order.status = OrderStatus.COMPLETED;
    await this.orderRepo.save(order);
  }
}