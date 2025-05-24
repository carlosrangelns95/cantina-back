import { Expose, Type } from 'class-transformer';
import { ReadProfileDto } from 'src/core-modules/profile/dto/read-profile.dto';

export class ReadAdminDto {
  @Expose()
  id: number;
}

export class ReadUserWithProfileAdminDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ReadProfileDto)
  profile: ReadProfileDto;
}
