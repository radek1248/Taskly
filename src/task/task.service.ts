import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { Task } from './task.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TasksCollection } from '../tasks-collection/tasks-collection.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(collectionId: string): Promise<Task[]> {
    try {
      const criteria: FindManyOptions<Task> = {
        where: { TasksCollection: { Collection_id: collectionId } },
        relations: ['TasksCollection'],
      };

      return await this.entityManager.find(Task, criteria);
    } catch (error) {
      console.error(`Failed to fetch all tasks: ${error.message}`);
      return undefined;
    }
  }

  async findOne(taskId: string): Promise<Task> {
    try {
      const criteria: FindOneOptions<Task> = {
        where: { Task_id: taskId },
        relations: ['TasksCollection'],
      };

      return await this.entityManager.findOne(Task, criteria);
    } catch (error) {
      console.error(`Failed to fetch task ${taskId}: ${error.message}`);
      return undefined;
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { Title, Description, Collection_id } = createTaskDto;

      const parentCollection = await this.entityManager.findOneBy(
        TasksCollection,
        {
          Collection_id: Collection_id,
        },
      );

      if (!parentCollection) {
        throw new NotFoundException(
          `Collection with id ${Collection_id} not found`,
        );
      }

      const task = {
        Title,
        Description,
        TasksCollection: parentCollection,
      };

      const newCollection = this.entityManager.create(Task, task);

      return await this.entityManager.save(newCollection);
    } catch (error) {
      console.error(`Failed to create task: ${error.message}`);
      return undefined;
    }
  }

  async updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Promise<any> {
    try {
      const criteria: FindOptionsWhere<Task> = {
        Task_id: taskId,
      };

      return await this.entityManager.update(Task, criteria, updateTaskDto);
    } catch (error) {
      console.error(`Failed to update task ${taskId}: ${error.message}`);
      return undefined;
    }
  }

  async deleteTask(taskId: string): Promise<string> {
    try {
      const criteria: FindOptionsWhere<Task> = {
        Task_id: taskId,
      };

      await this.entityManager.delete(Task, criteria);
      return 'Task deleted successfully';
    } catch (error) {
      console.error(`Failed to delete task ${taskId}: ${error}`);
      return undefined;
    }
  }
}
