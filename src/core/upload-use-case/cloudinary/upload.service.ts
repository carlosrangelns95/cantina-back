import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {

  constructor(
    @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,
  ) { }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'meus_uploads',
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Erro desconhecido no upload'));
          } else {
            resolve(result);
          }
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
