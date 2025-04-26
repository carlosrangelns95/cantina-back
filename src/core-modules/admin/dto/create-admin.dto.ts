import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { IsCPF, IsPassword, IsValidEmail, IsValidName } from "src/core/decorators/dto-validation.decorator";
import { ProfileRoleTypes } from "src/core/shared/enums";

export class CreateAdminDto {

  @ApiProperty()
  @IsValidEmail()
  email: string;

  @ApiProperty()
  @IsValidName()
  name: string;

  @ApiProperty()
  @IsPassword()
  password: string

  @ApiProperty()
  @IsCPF()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo role é obrigatório.' })
  @IsEnum(ProfileRoleTypes, { message: 'O campo role deve ser um dos seguintes: user, admin, super_admin.' })
  role: ProfileRoleTypes;

  @ApiProperty()
  @IsString({ message: 'O campo description é um texto.' })
  description: string;

}
