import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { createAdminSeed } from 'src/core/connection/seed/create-admin.seed';

async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  await createAdminSeed(dataSource);
  await app.close();
  
}

bootstrap();
