import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from 'src/core-modules/profile/profile.controller';
import { ProfileService } from 'src/core-modules/profile/profile.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
