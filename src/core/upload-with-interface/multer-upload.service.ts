import { Injectable } from "@nestjs/common";
import { UploadService } from "./upload.interface.service";
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MulterUploadService implements UploadService {

    async upload(file: Express.Multer.File): Promise<string> {
        const upload = path.join(__dirname, 'src/uploads', file.filename);
        fs.renameSync(file.path, upload)
        return upload;
    }

}