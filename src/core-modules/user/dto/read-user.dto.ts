import { Expose, Type } from 'class-transformer';
import { ReadProfileDto } from 'src/core-modules/profile/dto/read-profile.dto';

export class ReadUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ReadProfileDto)
  profile: ReadProfileDto[];
}
