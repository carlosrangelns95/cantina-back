// upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from './services/coudinary.service';
import { MulterService } from './services/multer.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly multerService: MulterService,
  ) { }

  async execute(file: Express.Multer.File): Promise<string> {
    const strategy = this.configService.get<string>('UPLOAD_STRATEGY');

    switch (strategy) {
      case 'cloudinary':
        return this.cloudinaryService.upload(file);
      case 'multer':
        return this.multerService.upload(file);
      default:
        throw new Error(`Unsupported upload strategy: ${strategy}`);
    }
  }
}
