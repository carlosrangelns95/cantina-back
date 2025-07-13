import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    const userId = req['user'].userId;
    console.log(`Usuário ${userId} tentando criar um pedido.`);

    return this.orderService.create(createOrderDto, req);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('my-orders')
  findAllByUser(@Request() req: any) {
    return this.orderService.findAllByUser(req);
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('complete/:id')
  update(@Param('id') id: string) {
    return this.orderService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
