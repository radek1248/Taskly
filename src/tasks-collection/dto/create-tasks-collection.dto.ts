import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TasksCollectionInterface } from '../tasks-collection.interface';

export class CreateTasksCollectionDto
  implements Omit<TasksCollectionInterface, 'Collection_id'>
{
  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsUUID()
  User_id: string;
}
