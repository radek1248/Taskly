import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TasksCollection } from './tasks-collection.entity';
import { CreateTasksCollectionDto } from './dto/create-tasks-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksCollectionService {
  constructor(
    @InjectRepository(TasksCollection)
    private readonly tasksCollectionRepository: Repository<TasksCollection>,
  ) {}

  async findAll(): Promise<TasksCollection[]> {
    return await this.tasksCollectionRepository.find();
  }

  async findOne(id: string): Promise<TasksCollection> {
    return await this.tasksCollectionRepository.findOne({
      where: { Collection_id: id },
    });
  }

  async createTasksCollection(
    tasksCollectionDto: CreateTasksCollectionDto,
  ): Promise<TasksCollection> {
    return await this.tasksCollectionRepository.save(tasksCollectionDto);
  }

  async updateTasksCollection(
    id: string,
    tasksCollectionDto: CreateTasksCollectionDto,
  ): Promise<any> {
    return await this.tasksCollectionRepository.update(id, tasksCollectionDto);
  }

  async deleteTasksCollection(id: string): Promise<void> {
    await this.tasksCollectionRepository.delete(id);
  }
}
