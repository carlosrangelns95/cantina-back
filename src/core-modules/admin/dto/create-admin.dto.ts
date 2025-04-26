import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { profileEnum } from "src/core-modules/profile/entities/profile.entity";
import { IsCPF, IsPassword, IsValidEmail, IsValidName } from "src/core/decorators/dto-validation.decorator";

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
  @IsIn(['user', 'admin', 'super_admin'], { message: 'O campo role deve ser um dos seguintes: user, admin, super_admin.' })
  role: profileEnum;

  @ApiProperty()
  @IsString({ message: 'O campo description é um texto.' })
  description: string;

}
