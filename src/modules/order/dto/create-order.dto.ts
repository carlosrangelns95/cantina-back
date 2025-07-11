import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// 1. DTO para cada item individual do pedido
class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

// 2. DTO principal para o objeto completo do pedido
export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true }) // Valida cada objeto dentro do array
    @Type(() => CreateOrderItemDto) // Transforma cada item do array em uma instância de CreateOrderItemDto
    items: CreateOrderItemDto[];
}