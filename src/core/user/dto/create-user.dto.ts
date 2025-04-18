import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsCPF, IsPassword, IsValidEmail, IsValidName } from "src/core/decorators/human.decorator";

export class CreateUserDto {

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
  @IsNotEmpty({ message: 'O campo CPF é obrigatório.' })
  cpf: string;

}
