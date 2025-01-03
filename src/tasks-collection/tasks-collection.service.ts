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
    try {
      return await this.entityManager.find(TasksCollection);
    } catch (error) {
      console.error(`Failed to fetch all tasks-collections: ${error.message}`);
      return undefined;
    }
  }

  async findOne(id: string): Promise<TasksCollection> {
    try {
      const criteria = { where: { Collection_id: id } };

      return await this.entityManager.findOne(TasksCollection, criteria);
    } catch (error) {
      console.error(`Failed to fetch task ${id}: ${error.message}`);
      return undefined;
    }
  }

  async createTasksCollection(
    tasksCollectionDto: CreateTasksCollectionDto,
  ): Promise<TasksCollection> {
    try {
      return await this.entityManager.save(TasksCollection, tasksCollectionDto);
    } catch (error) {
      console.error(`Failed to create task collection: ${error.message}`);
      return undefined;
    }
  }

  async updateTasksCollection(
    id: string,
    tasksCollectionDto: UpdateTasksCollectionDto,
  ): Promise<any> {
    try {
      return await this.entityManager.update(
        TasksCollection,
        id,
        tasksCollectionDto,
      );
    } catch (error) {
      console.error(`Failed to update task collection ${id}: ${error.message}`);
      return undefined;
    }
  }

  async deleteTasksCollection(id: string): Promise<string> {
    try {
      await this.entityManager.delete(TasksCollection, id);
      return 'Task collection deleted successfully';
    } catch (error) {
      console.error(`Failed to delete task collection ${id}: ${error.message}`);
      return undefined;
    }
  }
}
