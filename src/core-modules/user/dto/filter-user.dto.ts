import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsOptionalEmail } from 'src/core/decorators/dto-validation.decorator';

export class FilterUserDto {
  @ApiPropertyOptional({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ example: 'joao@email.com', required: false })
  @IsOptionalEmail()
  @Expose()
  email?: string;

  @ApiProperty({ example: 'Joao da Silva', required: false })
  @IsOptional()
  @IsString()
  @Expose()
  name?: string;
}
