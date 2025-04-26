import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProfileRoleTypes } from "src/core/shared/enums";

export class ReadProfileDto {

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ example: 'user' })
  @IsString()
  @Expose()
  role: ProfileRoleTypes;

  @ApiProperty({ example: 'Super Admin' })
  @IsOptional()
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
