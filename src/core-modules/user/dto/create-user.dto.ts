import { IsPassword, IsValidEmail, IsValidName } from "src/core/decorators/human.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'joao@email.com' })
  @IsValidEmail()
  email: string;

  @ApiProperty({ example: 'Joao da Silva' })
  @IsValidName()
  name: string;

  @ApiProperty({ example: 'W234@567e' })
  @IsPassword()
  password: string

}
