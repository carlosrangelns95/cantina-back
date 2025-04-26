import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ProfileRoleTypes } from "src/core/shared/enums";

export class CreateProfileDto {

  @ApiProperty({ example: 'user' })
  @IsNotEmpty({ message: 'O campo role é obrigatório.' })
  @IsEnum(ProfileRoleTypes, { message: 'O campo role deve ser um dos seguintes: user, admin, super_admin.' })
  role: ProfileRoleTypes;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo user_id é obrigatório.' })
  @IsNumber({}, { message: 'O campo user_id deve conter apenas números.' })
  user_id: number;
}
