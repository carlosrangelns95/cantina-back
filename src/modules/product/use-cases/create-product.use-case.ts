import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "../dto/create-product.dto";

export class CreateProductUseCase {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepo: Repository<ProductEntity>,
    ) { }

    async execute(data: CreateProductDto) {
        return await this.productRepo.save(data);
    }
}