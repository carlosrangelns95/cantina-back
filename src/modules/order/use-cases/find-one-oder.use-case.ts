import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class FindOneOrderUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) { }

  async execute(id: string) {
    return await this.orderRepo.findOneOrFail({
      where: { id },
      relations: ['orderItems']
    });
  }
}