import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksCollectionService } from './tasks-collection.service';
import { CreateTasksCollectionDto } from './dto/create-tasks-collection.dto';
import { CreateTaskWithoutCollectionIdDto } from '../task/dto/create-task.dto';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task.entity';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { UpdateTasksCollectionDto } from './dto/update-tasks-collection.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('tasks-collection')
export class TasksCollectionController {
  constructor(
    private readonly tasksCollectionService: TasksCollectionService,
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('view')
  @Render('tasks-collections/index')
  async renderCollectionsPage(@Req() req: Request) {
    const userId = this.extractUserIdFromToken(req);
    const collections = await this.tasksCollectionService.findAll(userId);
    return { collections, userId };
  }

  @Get(':userId/:collectionId/view')
  @Render('tasks-collections/detail')
  async renderSingleCollectionPage(
    @Param('userId') userId: string,
    @Param('collectionId') collectionId: string,
  ) {
    const collection = await this.tasksCollectionService.findOne(
      userId,
      collectionId,
    );
    const tasks = await this.taskService.findAll(collectionId);
    collection.Tasks = tasks;
    return { collection };
  }

  // @Get(':userId/:collectionId')
  // async findOne(
  //   @Param('userId') userId: string,
  //   @Param('collectionId') id: string,
  // ): Promise<TasksCollection> {
  //   return await this.tasksCollectionService.findOne(userId, id);
  // }

  @Post('new')
  async createTasksCollection(
    @Body() taskCollectionDto: CreateTasksCollectionDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const userId = this.extractUserIdFromToken(req);

      await this.tasksCollectionService.createTasksCollection({
        ...taskCollectionDto,
        User_id: userId,
      });

      res.redirect('/tasks-collection/view');
    } catch (error) {
      console.error('Error creating collection:', error.message);
      return { success: false, message: 'Failed to create collection' };
    }
  }

  @Patch(':collectionId')
  async updateTasksCollection(
    @Param('collectionId') id: string,
    @Body() taskCollectionDto: UpdateTasksCollectionDto,
    @Res() res: Response,
  ): Promise<any> {
    // console.log(id, taskCollectionDto);
    try {
      await this.tasksCollectionService.updateTasksCollection(
        id,
        taskCollectionDto,
      );

      res.redirect('/tasks-collection/view');
    } catch (error) {
      console.error('Error editing collection:', error.message);
      return { success: false, message: 'Failed to edit collection' };
    }
  }

  @Delete(':collectionId')
  async deleteTasksCollection(
    @Param('collectionId') collectionId: string,
  ): Promise<string> {
    return await this.tasksCollectionService.deleteTasksCollection(
      collectionId,
    );
  }

  // TASKS ROUTES
  @Get('/:collectionId/tasks')
  async findAllTasks(
    @Param('collectionId') collectionId: string,
  ): Promise<any> {
    try {
      const tasks = await this.taskService.findAll(collectionId);
      // console.log(tasks);
      return tasks;
    } catch (error) {
      console.error(
        `Error fetching tasks from collection ${collectionId}:`,
        error.message,
      );
    }
  }

  @Get('/tasks/:taskId')
  async findOneTask(@Param('taskId') taskId: string): Promise<Task> {
    return await this.taskService.findOne(taskId);
  }

  @Post('/:collectionId/tasks')
  async createTask(
    @Param('collectionId') collectionId: string,
    @Body()
    createTaskDto: CreateTaskWithoutCollectionIdDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.taskService.createTask({
        ...createTaskDto,
        Collection_id: collectionId,
      });

      res.redirect('/tasks-collection/view');
    } catch (error) {
      console.error('Error creating new task:', error.message);
      return { success: false, message: 'Failed to create new task' };
    }
  }

  @Patch('/tasks/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.taskService.updateTask(taskId, updateTaskDto);
      res.redirect('/tasks-collection/view');
    } catch (error) {
      console.error('Error editing task', error.message);
      return { success: false, message: 'Failed to edit new task' };
    }
  }

  @Delete('/tasks/:taskId')
  async deleteTask(
    @Param('taskId') taskId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.taskService.deleteTask(taskId);
      res.redirect('/tasks-collection/view');
    } catch (error) {
      console.error('Error editing task', error.message);
      return { success: false, message: 'Failed to edit new task' };
    }
  }

  private extractUserIdFromToken(req: Request): string {
    const token = req.cookies?.Authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      return payload.sub;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
