import { UploadService } from "./upload.interface.service";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClaudinaryUploadService implements UploadService {

    constructor(private readonly configService: ConfigService,) {
        cloudinary.config({
            cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    async upload(file: Express.Multer.File): Promise<string> {
        const upload = await cloudinary.uploader.upload(file.path);
        return upload.secure_url;
    }

} 
