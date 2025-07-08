import { Module } from '@nestjs/common';
import { MessageTemplateService } from './message-template.service';
import { MessageTemplateController } from './message-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/core-modules/user/user.module';
import { MessageTemplate } from 'src/core/message-template/entities/message-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageTemplate]), UserModule],
  controllers: [MessageTemplateController],
  providers: [MessageTemplateService],
})
export class MessageTemplateModule {}
