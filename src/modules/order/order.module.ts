import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { OrderItemEntity } from '../order-items/entities/order-item.entity';
import { AuthModule } from 'src/core/auth/auth.module';
import { UserEntity } from 'src/core-modules/user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { FindAllOrdersUseCase } from './use-cases/find-all-orders.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, UserEntity, ProductEntity]),
    AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService, CreateOrderUseCase, FindAllOrdersUseCase],
})
export class OrderModule { }
