import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    console.log();
    return await this.taskRepository.findOne({ where: { Task_id: id } });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    return await this.taskRepository.save(createTaskDto);
  }

  async updateTask(id: string, createTaskDto: CreateTaskDto): Promise<any> {
    return await this.taskRepository.update(id, createTaskDto);
  }

  async deleteTask(id: string): Promise<any> {
    return await this.taskRepository.delete(id);
  }
}
