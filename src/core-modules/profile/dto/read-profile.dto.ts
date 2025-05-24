import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ReadAdminDto } from 'src/core-modules/admin/dto/read-admin.dto';
import { ProfileRoleTypes } from 'src/core/shared/enums';

export class ReadProfileDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'user' })
  @Expose()
  role: ProfileRoleTypes;

  @ApiProperty({ example: 'Super Admin' })
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  // @Expose()
  // @Transform(({ obj }) => obj.role === 'admin' ? obj.admin : undefined)  // só virá se for admin
  // @Type(() => ReadAdminDto)
  // admin?: ReadAdminDto;

  @Expose()
  @Type(() => ReadAdminDto)
  admin?: ReadAdminDto;
}
