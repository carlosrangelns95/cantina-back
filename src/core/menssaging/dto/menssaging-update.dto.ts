import { PartialType } from '@nestjs/swagger';
import { MenssagingCreateDto } from './menssaging-create.dto';

export class MenssagingUpdateDto extends PartialType(MenssagingCreateDto) {}
