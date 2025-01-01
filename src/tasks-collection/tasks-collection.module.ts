import { Module } from '@nestjs/common';
import { TasksCollectionService } from './tasks-collection.service';
import { TasksCollectionController } from './tasks-collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksCollection } from './tasks-collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksCollection])],
  controllers: [TasksCollectionController],
  providers: [TasksCollectionService],
  exports: [TypeOrmModule, TasksCollectionService],
})
export class TasksCollectionModule {}
