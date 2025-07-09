import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { createAdminSeed } from 'src/core/connection/seed/create-admin.seed';
import { seedProfiles } from './profiles.seed';
import { seedProducts } from './products.seed';

async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  await seedProfiles(dataSource);
  await createAdminSeed(dataSource);
  await seedProducts(dataSource);
  await app.close();
  
}

bootstrap();
