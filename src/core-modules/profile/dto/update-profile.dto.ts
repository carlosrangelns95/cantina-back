import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { ProfileRoleTypes } from "src/core/shared/enums";


export class UpdateProfileDto {

  @ApiPropertyOptional({ example: 'user' })
  @IsString()
  @Expose()
  role: ProfileRoleTypes;

  @ApiPropertyOptional({ example: 'Super Admin' })
  @IsOptional()
  @IsString()
  @Expose()
  description: string;

}
