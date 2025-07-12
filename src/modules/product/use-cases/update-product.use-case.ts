import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProductDto } from "../dto/update-product.dto";
import { HttpStatus, Logger } from "@nestjs/common";

export class UpdateProductUseCase {
    logger = new Logger(UpdateProductUseCase.name, { timestamp: true });
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepo: Repository<ProductEntity>,
    ) { }

    async execute(id: string, data: UpdateProductDto) {
        const product = await this.productRepo.findOneOrFail({ where: { id } });

        this.logger.debug(`Product: ${JSON.stringify(product)}`);
        
        const updated = this.productRepo.merge(product, data);
        await this.productRepo.save(updated);

        return {
            message: 'Produto atualizado com sucesso',
            code: HttpStatus.OK,
        };
    }
}