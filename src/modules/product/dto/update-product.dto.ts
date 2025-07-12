import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from 'src/core/shared/enums';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    value?: number;

    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;
}