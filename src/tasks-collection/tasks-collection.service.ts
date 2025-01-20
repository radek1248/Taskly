import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindManyOptions, FindOneOptions } from 'typeorm';
import { TasksCollection } from './tasks-collection.entity';
import { CreateTasksCollectionDto } from './dto/create-tasks-collection.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UpdateTasksCollectionDto } from './dto/update-tasks-collection.dto';
import { User } from '../users/users.entity';

@Injectable()
export class TasksCollectionService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll(userId: string): Promise<TasksCollection[]> {
    try {
      const criteria: FindManyOptions<TasksCollection> = {
        where: { User: { User_id: userId } },
        relations: ['User'],
      };
      return await this.entityManager.find(TasksCollection, criteria);
    } catch (error) {
      console.error(`Failed to fetch all tasks-collections: ${error.message}`);
      return undefined;
    }
  }

  async findOne(userId: string, id: string): Promise<TasksCollection> {
    try {
      const criteria: FindOneOptions<TasksCollection> = {
        where: {
          User: { User_id: userId },
          Collection_id: id,
        },
        relations: ['User'],
      };

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
      const { User_id, ...restData } = tasksCollectionDto;

      const foundUser = await this.entityManager.findOneBy(User, {
        User_id: User_id,
      });

      if (!foundUser) {
        throw new NotFoundException(`User with id ${User_id} not found`);
      }

      const user = {
        User: foundUser,
        ...restData,
      };

      return await this.entityManager.save(TasksCollection, user);
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
