import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<CreateTaskDto[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreateTaskDto> {
    return await this.taskService.findOne(id);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    return await this.taskService.updateTask(id, createTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<CreateTaskDto> {
    return await this.taskService.deleteTask(id);
  }
}
