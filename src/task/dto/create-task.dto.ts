import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TaskInterface } from '../task.interface';

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
}
