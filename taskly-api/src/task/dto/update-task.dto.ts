import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskInterface } from '../task.interface';
import { Priority } from './create-task.dto';

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
  @IsEnum(Priority)
  Priority: Priority;

  @IsOptional()
  @IsObject()
  TasksCollection: TasksCollectionDto;
}
