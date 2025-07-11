import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../../../core-modules/admin/admin.controller';
import { AdminService } from '../../../core-modules/admin/admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
