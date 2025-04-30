import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterService } from './services/multer.service';
import { CloudinaryService } from './services/coudinary.service';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [UploadService, MulterService, CloudinaryService],
  exports: [UploadService],
})
export class UploadModule { }
