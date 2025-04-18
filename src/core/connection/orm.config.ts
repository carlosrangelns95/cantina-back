// orm.config.ts
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm'; // <- Aqui é a diferença

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions  = {
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, // desativar após desenvolvimento
};