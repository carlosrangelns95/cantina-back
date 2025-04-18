import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => databaseConfig,
    }),
  ],
  exports: [TypeOrmModule], // Exporta para outros módulos usarem o TypeORM
})

export class ConnectionModule {

  private readonly logger = new Logger(ConnectionModule.name);

  constructor(
    private readonly dataSource: DataSource
  ) {

    const green = '\x1b[32m';
    const red = '\x1b[31m';
    const bold = '\x1b[1m';
    const reset = '\x1b[0m';

    if (this.dataSource.isInitialized) {
      this.logger.log(`${green}${bold} Banco de dados conectado com sucesso!${reset}`);
    } else {
      this.logger.error(`${red}${bold} Banco de dados não está conectado!${reset}`);
    }

  }
}
