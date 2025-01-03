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
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { TasksCollection } from './tasks-collection.entity';
import { UpdateTasksCollectionDto } from './dto/update-tasks-collection.dto';

@Controller('tasks-collection')
export class TasksCollectionController {
  constructor(
    private readonly tasksCollectionService: TasksCollectionService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async findAll(): Promise<TasksCollection[]> {
    return await this.tasksCollectionService.findAll();
  }

  @Get(':collectionId')
  async findOne(@Param('collectionId') id: string): Promise<TasksCollection> {
    return await this.tasksCollectionService.findOne(id);
  }

  @Post()
  async createTasksCollection(
    @Body() taskCollectionDto: CreateTasksCollectionDto,
  ): Promise<TasksCollection> {
    return await this.tasksCollectionService.createTasksCollection(
      taskCollectionDto,
    );
  }

  @Patch(':collectionId')
  async updateTasksCollection(
    @Param('collectionId') id: string,
    @Body() taskCollectionDto: UpdateTasksCollectionDto,
  ): Promise<any> {
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
  @Get('/:collectionId/tasks')
  async findAllTasks(
    @Param('collectionId') collectionId: string,
  ): Promise<Task[]> {
    return await this.taskService.findAll(collectionId);
  }

  @Get('/tasks/:taskId')
  async findOneTask(@Param('taskId') taskId: string): Promise<Task> {
    return await this.taskService.findOne(taskId);
  }

  @Post('/tasks')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Patch('/tasks/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Delete('/tasks/:taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<void> {
    await this.taskService.deleteTask(taskId);
  }
}
