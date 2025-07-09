import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './core/swagger/swagger-init.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    // origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
  Logger.debug(`server: http://localhost:${process.env.PORT ?? 3000}`);
  Logger.debug(
    `swagger: http://localhost:${process.env.PORT ?? 3000}/api-docs`,
  );
}

bootstrap();
