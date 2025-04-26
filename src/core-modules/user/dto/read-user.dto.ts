import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ReadUserDto {

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

}