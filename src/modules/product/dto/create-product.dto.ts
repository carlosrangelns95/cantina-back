import { IsEnum, IsNumber, IsString } from "class-validator";
import { ProductCategory } from "src/core/shared/enums";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsNumber()
    value: number;

    @IsEnum(ProductCategory)
    category: ProductCategory;
}
