import { Module } from '@nestjs/common';
import { TasksCollectionService } from './tasks-collection.service';
import { TasksCollectionController } from './tasks-collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksCollection } from './tasks-collection.entity';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksCollection]), TaskModule],
  controllers: [TasksCollectionController],
  providers: [TasksCollectionService],
  exports: [TypeOrmModule, TasksCollectionService],
})
export class TasksCollectionModule {}
