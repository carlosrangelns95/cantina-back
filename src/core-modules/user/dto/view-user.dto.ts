import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ViewUserDto {

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Expose()
  is_active: boolean;
  
}