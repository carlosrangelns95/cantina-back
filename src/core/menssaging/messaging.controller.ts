import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenssagingService } from './menssaging.service';
import { MenssagingCreateDto } from 'src/core/menssaging/dto/menssaging-create.dto';
import { MenssagingUpdateDto } from 'src/core/menssaging/dto/menssaging-update.dto';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messageService: MenssagingService) {}

  @Get('/test')
  test() {
    return this.messageService.sendEmail();
  }

  @Post()
  create(@Body() createDto: MenssagingCreateDto) {
    return this.messageService.create(createDto);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: MenssagingUpdateDto) {
    return this.messageService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
