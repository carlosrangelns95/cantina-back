import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { MessageTemplateModule } from './core/message-template/message-template.module';

@Module({
  imports: [CoreModule, MessageTemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// {
//   provide: APP_GUARD,
//   useClass: AccessGuard,
// },
