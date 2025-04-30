import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('upload-use-case')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Faz upload de um arquivo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.execute(file);
    return {
      url: result,
    };
  }
}
