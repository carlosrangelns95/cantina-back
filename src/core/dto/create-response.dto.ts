import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateResponseDto {
  @ApiProperty({ example: 'd0b5d8c0-d6e0-4c2d-b0e1-e9f5b1b2c3d4' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Operação realizada com sucesso.' })
  @IsString()
  message: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  code: number;
}
