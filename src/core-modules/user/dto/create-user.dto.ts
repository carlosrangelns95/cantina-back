import { IsPassword, IsValidEmail, IsValidName } from "src/core/decorators/dto-validation.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { ProfileRoleTypes } from "src/core/shared/enums";

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


  @ApiProperty({ enum: ProfileRoleTypes })
  @IsEnum(ProfileRoleTypes)
  category: ProfileRoleTypes

}
