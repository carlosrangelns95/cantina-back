import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsUseCase } from './use-cases/find-all-products.use-case';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth-guard';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@UseGuards(JwtAuthGuard)
@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto);
  }

  async findAll() {
    return await this.findAllProductsUseCase.execute();
  }

  async findOne(id: string) {
    return await this.findOneProductUseCase.execute(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.updateProductUseCase.execute(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.deleteProductUseCase.execute(id);
  }
}
