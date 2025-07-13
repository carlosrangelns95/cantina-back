import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../entities/order.entity";

export class DeleteOrderUseCase {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly productRepo: Repository<OrderEntity>,
    ) { }

    async execute(id: string) {
        return await this.productRepo.softDelete({ id });
    }
}