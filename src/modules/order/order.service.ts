import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { FindAllOrdersUseCase } from './use-cases/find-all-orders.use-case';
import { FindAllOrdersByUserUseCase } from './use-cases/find-all-orders-user.use-case';
import { DeleteOrderUseCase } from './use-cases/delete-order.use-case';
import { CompleteOrderUseCase } from './use-cases/complete-order.use-case';
import { FindOneOrderUseCase } from './use-cases/find-one-oder.use-case';

@Injectable()
export class OrderService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly findAllOrdersByUserUseCase: FindAllOrdersByUserUseCase,
    private readonly completeOrderUseCase: CompleteOrderUseCase,
    private readonly findOneOrderUseCase: FindOneOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) { }

  async create(createOrderDto: CreateOrderDto, req: any) {
    return await this.createOrderUseCase.execute(createOrderDto, req);
  }

  async findAllByUser(req: any) {
    return await this.findAllOrdersByUserUseCase.execute(req);
  }

  async findAll() {
    return await this.findAllOrdersUseCase.execute();
  }

  async findOne(id: string) {
    return await this.findOneOrderUseCase.execute(id);
  }

  async update(id: string) {
    return await this.completeOrderUseCase.execute(id);
  }

  async remove(id: string) {
    return await this.deleteOrderUseCase.execute(id);
  }
}
