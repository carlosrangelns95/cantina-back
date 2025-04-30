import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MulterService {
    async upload(file: Express.Multer.File): Promise<string> {
        const uploadDir = path.join(process.cwd(), 'src', 'uploads');

        // Verifica se o diretório de uploads existe, caso não exista, cria-o
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // gera nome único
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const ext = path.extname(file.originalname);
        const filename = `${timestamp}-${random}${ext}`;

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, file.buffer);
        
        return filePath;
    }
}
