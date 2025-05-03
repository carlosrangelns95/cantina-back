import { Expose, Type } from 'class-transformer';
import { ReadProfileDto } from 'src/core-modules/profile/dto/read-profile.dto';

export class ReadAdminDto {
  @Expose()
  @Type(() => ReadProfileDto)
  profile: ReadProfileDto;
}
