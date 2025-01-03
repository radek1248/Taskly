import { IsOptional, IsString } from 'class-validator';
import { TasksCollectionInterface } from '../tasks-collection.interface';

export class UpdateTasksCollectionDto
  implements Omit<TasksCollectionInterface, 'Collection_id'>
{
  @IsOptional()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description: string;
}
