import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class FindAllOrdersByUserUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) { }

  async execute(req: any) {
    console.log(`Usuário ${req['user'].userId} está tentando ver suas ordens.`);
    return await this.orderRepo.find({
      where: {
        userId: req['user'].userId,
      },
      relations: ['orderItems'],
    });
  }
}