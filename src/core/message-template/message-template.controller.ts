import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageTemplateService } from './message-template.service';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { UpdateMessageTemplateDto } from './dto/update-message-template.dto';

@Controller('message-template')
export class MessageTemplateController {
  constructor(
    private readonly messageTemplateService: MessageTemplateService,
  ) {}

  @Post()
  create(@Body() createMessageTemplateDto: CreateMessageTemplateDto) {
    return this.messageTemplateService.create(createMessageTemplateDto);
  }

  @Get()
  findAll() {
    return this.messageTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageTemplateDto: UpdateMessageTemplateDto,
  ) {
    return this.messageTemplateService.update(+id, updateMessageTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageTemplateService.remove(+id);
  }
}
