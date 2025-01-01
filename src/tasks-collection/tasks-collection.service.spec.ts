import { Test, TestingModule } from '@nestjs/testing';
import { TasksCollectionService } from './tasks-collection.service';

describe('TasksCollectionService', () => {
  let service: TasksCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCollectionService],
    }).compile();

    service = module.get<TasksCollectionService>(TasksCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
