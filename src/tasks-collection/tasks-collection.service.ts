import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TasksCollection } from './tasks-collection.entity';
import { CreateTasksCollectionDto } from './dto/create-tasks-collection.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UpdateTasksCollectionDto } from './dto/update-tasks-collection.dto';

@Injectable()
export class TasksCollectionService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<TasksCollection[]> {
    return await this.entityManager.find(TasksCollection);
  }

  async findOne(id: string): Promise<TasksCollection> {
    return await this.entityManager.findOne(TasksCollection, {
      where: { Collection_id: id },
    });
  }

  async createTasksCollection(
    tasksCollectionDto: CreateTasksCollectionDto,
  ): Promise<TasksCollection> {
    return await this.entityManager.save(TasksCollection, tasksCollectionDto);
  }

  async updateTasksCollection(
    id: string,
    tasksCollectionDto: UpdateTasksCollectionDto,
  ): Promise<any> {
    return await this.entityManager.update(
      TasksCollection,
      id,
      tasksCollectionDto,
    );
  }

  async deleteTasksCollection(id: string): Promise<void> {
    await this.entityManager.delete(TasksCollection, id);
  }
}
