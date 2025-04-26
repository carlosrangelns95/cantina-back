import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ProfileRoleTypes } from "src/core/shared/enums";

export class CreateProfileDto {

  @ApiProperty({ example: 'user' })
  @IsNotEmpty({ message: (args) => `O campo "${args.property}" é obrigatório.` })
  @IsEnum(ProfileRoleTypes, { message: (args) => `O campo "${args.property}" deve ser um dos seguintes: ${JSON.stringify(Object.values(ProfileRoleTypes))}` })
  role: ProfileRoleTypes;

  @ApiProperty({ example: 'Usuário comum do sistema' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'O campo user_id é obrigatório.' })
  @IsNumber({}, { message: 'O campo user_id deve conter apenas números.' })
  user_id: number;
}
