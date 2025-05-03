import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';

// import { APP_GUARD } from '@nestjs/core';
// import { AccessGuard } from 'src/core/auth/guards/access.guard';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// {
//   provide: APP_GUARD,
//   useClass: AccessGuard,
// },
