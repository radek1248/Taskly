import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskInterface } from '../task.interface';

class TasksCollectionDto {
  @IsNotEmpty()
  @IsUUID()
  Collection_id: string;
}

export class UpdateTaskDto
  implements Omit<TaskInterface, 'Task_id' | 'TasksCollection'>
{
  @IsOptional()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description: string;

  @IsOptional()
  @IsObject()
  TasksCollection: TasksCollectionDto;
}
