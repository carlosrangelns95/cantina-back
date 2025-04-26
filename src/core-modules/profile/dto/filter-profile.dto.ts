import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { ProfileRoleTypes } from "src/core/shared/enums";

export class FilterProfileDto {

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ example: 'user' })
  @IsOptional({ message: 'O campo role é obrigatório.' })
  @IsEnum(ProfileRoleTypes)
  role?: ProfileRoleTypes;

  @ApiPropertyOptional({ example: 'Usuário comum do sistema' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'O campo user_id deve conter apenas números.' })
  user_id?: number;
}
