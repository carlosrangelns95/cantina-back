import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAllProductsUseCase } from './use-cases/find-all-products.use-case';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { FindOneProductUseCase } from './use-cases/find-one-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    CreateProductUseCase,
    FindOneProductUseCase,
    FindAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule { }
