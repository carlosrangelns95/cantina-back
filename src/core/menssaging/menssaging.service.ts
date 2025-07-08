import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenssagingCreateDto } from 'src/core/menssaging/dto/menssaging-create.dto';
import { MenssagingUpdateDto } from 'src/core/menssaging/dto/menssaging-update.dto';
import { EmailTemplateTypes } from 'src/core/shared/enums';
import { MessageTemplate } from 'src/core/message-template/entities/message-template.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MenssagingService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(MessageTemplate)
    private readonly templateRepository: Repository<MessageTemplate>,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendEmail(): Promise<string> {
    const from: string = this.configService.get<string>('MAIL_USER')!;

    const template: MessageTemplate =
      await this.templateRepository.findOneOrFail({
        where: { identifier: EmailTemplateTypes.TEST },
      });

    let content: string = template.content;
    const replacements = {
      nome: 'Carlos Rangel',
      equipe: 'Equipe de desenvolvimento',
    };

    for (const [key, value] of Object.entries(replacements)) {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    const data = {
      from: `"Os oficina" <${from}>`,
      to: 'carlos.rangel.ns95@gmail.com',
      subject: 'Teste de email',
      html: content,
    };

    const info: any = await this.transporter.sendMail(data);

    console.log(info)
    console.log(content);

    return content;
  }

  create(createDto: MenssagingCreateDto) {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all `;
  }

  findOne(id: number) {
    return `This action returns a #${id} `;
  }

  update(id: number, updateDto: MenssagingUpdateDto) {
    return `This action updates a #${id} `;
  }

  remove(id: number) {
    return `This action removes a #${id} `;
  }
}
