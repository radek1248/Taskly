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
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.entity';

@Controller('tasks-collection')
export class TasksCollectionController {
  constructor(
    private readonly tasksCollectionService: TasksCollectionService,
    private readonly taskSerivce: TaskService,
  ) {}

  @Get()
  async findAll(): Promise<CreateTasksCollectionDto[]> {
    return await this.tasksCollectionService.findAll();
  }

  @Get(':collectionId')
  async findOne(
    @Param('collectionId') id: string,
  ): Promise<CreateTasksCollectionDto> {
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

  @Patch(':collectionId')
  async updateTasksCollection(
    @Param('collectionId') id: string,
    @Body() taskCollectionDto: CreateTasksCollectionDto,
  ): Promise<CreateTasksCollectionDto> {
    return await this.tasksCollectionService.updateTasksCollection(
      id,
      taskCollectionDto,
    );
  }

  @Delete(':collectionId')
  async deleteTasksCollection(
    @Param('collectionId') collectionId: string,
  ): Promise<void> {
    await this.tasksCollectionService.deleteTasksCollection(collectionId);
  }

  // TASKS ROUTES
  @Get(':collectionId/tasks')
  async getTasks(@Param('collectionId') collectionId: string): Promise<Task[]> {
    return await this.taskSerivce.findAll(collectionId);
  }

  @Get('/:collectionId/tasks/:taskId')
  async getTask(
    @Param('collectionId') collectionId: string,
    @Param('taskId') taskId: string,
  ): Promise<Task> {
    return await this.taskSerivce.findOne(collectionId, taskId);
  }

  @Post('/:collectionId/add-task')
  async addTask(
    @Param('collectionId') collectionId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    return await this.taskSerivce.createTask(collectionId, createTaskDto);
  }

  @Patch('/:collectionId/update-task/:taskId')
  async updateTask(
    @Param('collectionId') collectionId: string,
    @Param('taskId') taskId: string,
    @Body() taskDto: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    return await this.taskSerivce.updateTask(collectionId, taskId, taskDto);
  }

  @Delete('/:collectionId/delete-task/:taskId')
  async deleteTask(
    @Param('collectionId') collectionId: string,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    await this.taskSerivce.deleteTask(collectionId, taskId);
  }
}
