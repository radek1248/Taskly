import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
  exports: [TypeOrmModule, TaskService],
})
export class TaskModule {}
