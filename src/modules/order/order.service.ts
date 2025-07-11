import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';

@Injectable()
export class OrderService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  async create(createOrderDto: CreateOrderDto, req: any) {
    return await this.createOrderUseCase.execute(createOrderDto, req);
  }

  findAll() {
    return `This action returns all order`;
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
