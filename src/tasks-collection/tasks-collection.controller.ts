import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksCollectionService } from './tasks-collection.service';
import { CreateTasksCollectionDto } from './dto/create-tasks-collection.dto';

@Controller('tasks-collection')
export class TasksCollectionController {
  constructor(private tasksCollectionService: TasksCollectionService) {}

  @Get()
  async findAll(): Promise<CreateTasksCollectionDto[]> {
    return await this.tasksCollectionService.findAll();
  }

  @Get(':id')
  async findOne(id: string): Promise<CreateTasksCollectionDto> {
    return await this.tasksCollectionService.findOne(id);
  }

  @Post()
  async createTasksCollection(
    @Body() taskCollectionDto: CreateTasksCollectionDto,
  ): Promise<CreateTasksCollectionDto> {
    return await this.tasksCollectionService.createTasksCollection(
      taskCollectionDto,
    );
  }

  @Patch(':id')
  async updateTasksCollection(
    @Param('id') id: string,
    @Body() taskCollectionDto: CreateTasksCollectionDto,
  ): Promise<CreateTasksCollectionDto> {
    return await this.tasksCollectionService.updateTasksCollection(
      id,
      taskCollectionDto,
    );
  }

  @Delete(':id')
  async deleteTasksCollection(@Param('id') id: string): Promise<void> {
    await this.tasksCollectionService.deleteTasksCollection(id);
  }
}
