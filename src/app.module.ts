import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { MessageTemplateModule } from './core/message-template/message-template.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [CoreModule, MessageTemplateModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// {
//   provide: APP_GUARD,
//   useClass: AccessGuard,
// },
