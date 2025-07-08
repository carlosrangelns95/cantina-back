import { Module } from '@nestjs/common';
import { MenssagingService } from './menssaging.service';
import { MessagingController } from './messaging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageTemplate } from 'src/core/message-template/entities/message-template.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([MessageTemplate]), ConfigModule],
  controllers: [MessagingController],
  providers: [MenssagingService],
})
export class MessagingModule {}