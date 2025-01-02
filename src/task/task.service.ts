import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(collcetionId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { Collection_id: collcetionId },
    });
  }

  async findOne(collectionId: string, taskId: string): Promise<Task> {
    const criteria: FindOneOptions<Task> = {
      where: { Collection_id: collectionId, Task_id: taskId },
    };
    return await this.taskRepository.findOne(criteria);
  }

  async createTask(
    collectionId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<any> {
    const task = {
      ...createTaskDto,
      Collection_id: collectionId,
    };
    return await this.taskRepository.save(task);
  }

  async updateTask(
    collectionId: string,
    taskId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<any> {
    const criteria: FindOptionsWhere<Task> = {
      Collection_id: collectionId,
      Task_id: taskId,
    };
    return await this.taskRepository.update(criteria, createTaskDto);
  }

  async deleteTask(collectionId: string, taskId: string): Promise<any> {
    const criteria: FindOptionsWhere<Task> = {
      Collection_id: collectionId,
      Task_id: taskId,
    };
    return await this.taskRepository.delete(criteria);
  }
}
