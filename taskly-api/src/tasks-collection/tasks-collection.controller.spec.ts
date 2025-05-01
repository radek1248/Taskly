import { Test, TestingModule } from '@nestjs/testing';
import { TasksCollectionController } from './tasks-collection.controller';

describe('TasksCollectionController', () => {
  let controller: TasksCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksCollectionController],
    }).compile();

    controller = module.get<TasksCollectionController>(
      TasksCollectionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
