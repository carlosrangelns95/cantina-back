import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class FindOneProductUseCase {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepo: Repository<ProductEntity>,
    ) { }

    async execute(id: string) {
        return await this.productRepo.findOne({ where: { id } });
    }
}