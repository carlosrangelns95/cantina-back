import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class FindAllOrdersUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) { }

  async execute() {
    return await this.orderRepo.find({
      relations: ['orderItems', 'orderItems.product'],
    });
  }
}