import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskInterface } from '../task.interface';

export enum Priority {
  low = 'LOW',
  normal = 'NORMAL',
  high = 'HIGH',
  none = 'NONE',
}

export class CreateTaskDto
  implements Omit<TaskInterface, 'Task_id' | 'TasksCollection'>
{
  @IsNotEmpty()
  @IsUUID()
  Collection_id: string;

  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsOptional()
  @IsEnum(Priority)
  Priority: Priority;

  @IsOptional()
  DueDate: Date;
}

export class CreateTaskWithoutCollectionIdDto
  implements Omit<TaskInterface, 'Task_id' | 'TasksCollection'>
{
  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description: string;

  @IsOptional()
  @IsEnum(Priority)
  Priority: Priority;

  @IsOptional()
  DueDate: Date;
}
