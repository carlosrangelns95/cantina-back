import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsUseCase } from './use-cases/find-all-products.use-case';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth-guard';

@UseGuards(JwtAuthGuard)
@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto);
  }

  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
