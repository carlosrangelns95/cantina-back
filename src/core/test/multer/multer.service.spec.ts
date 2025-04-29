import { Test, TestingModule } from '@nestjs/testing';
import { MulterService } from '../../upload-use-case/multer/multer.service';

describe('MulterService', () => {
  let service: MulterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MulterService],
    }).compile();

    service = module.get<MulterService>(MulterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
