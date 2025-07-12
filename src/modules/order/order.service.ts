import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { FindAllOrdersUseCase } from './use-cases/find-all-orders.use-case';

@Injectable()
export class OrderService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
  ) { }

  async create(createOrderDto: CreateOrderDto, req: any) {
    return await this.createOrderUseCase.execute(createOrderDto, req);
  }

  async findAll(req: any) {
    return await this.findAllOrdersUseCase.execute(req);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
