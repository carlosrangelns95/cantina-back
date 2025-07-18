import { Injectable } from '@nestjs/common';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { UpdateMessageTemplateDto } from './dto/update-message-template.dto';

@Injectable()
export class MessageTemplateService {
  create(createMessageTemplateDto: CreateMessageTemplateDto) {
    return 'This action adds a new messageTemplate';
  }

  findAll() {
    return `This action returns all messageTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageTemplate`;
  }

  update(id: number, updateMessageTemplateDto: UpdateMessageTemplateDto) {
    return `This action updates a #${id} messageTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageTemplate`;
  }
}

/* <h1>Olá, {{nome}}!</h1><p>Esta é uma mensagem teste.</p><p>Atenciosamente,<br>Equipe de desenvolvimento {{equipe}}</p> */
