import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateResponseDto {
  @ApiProperty({ example: 'Operação realizada com sucesso.' })
  @IsString()
  message: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  code: number;
}
