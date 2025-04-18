import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { profileEnum } from "../entities/profile.entity";

export class CreateProfileDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo role é obrigatório.' })
  @IsIn(['user', 'admin', 'super_admin'], { message: 'O campo role deve ser um dos seguintes: user, admin, super_admin.' })
  role: profileEnum;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo user_id é obrigatório.' })
  @IsNumber({}, { message: 'O campo user_id deve conter apenas números.' })
  user_id: number;
}
