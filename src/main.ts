import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './core/swagger/swagger-init.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora qualquer propriedade que não esteja no DTO
      forbidNonWhitelisted: true, // lança erro se alguém mandar propriedade a mais
      transform: true, // transforma automaticamente payloads em instâncias da classe DTO
    }),
  );

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
  Logger.debug(`server: http://localhost:${process.env.PORT ?? 3000}`);
  Logger.debug(`swagger: http://localhost:${process.env.PORT ?? 3000}/api`);

}
bootstrap();
