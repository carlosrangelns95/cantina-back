import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { IsValidEmail } from 'src/core/decorators/human.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiPropertyOptional({ example: 'joao@email.com' })
  @IsOptional()
  @IsValidEmail()
  email: string;


  @ApiPropertyOptional({ example: 'Joao da Silva' })
  @IsOptional()
  name: string;

}
