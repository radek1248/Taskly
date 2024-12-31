import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TaskService {
  constructor() {}

  async createTask(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    return createTaskDto;
  }
}
