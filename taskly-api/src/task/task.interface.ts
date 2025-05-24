import { TasksCollectionInterface } from '../tasks-collection/tasks-collection.interface';
import { Priority } from './dto/create-task.dto';

export interface TaskInterface {
  Task_id: string;
  Title: string;
  Description: string;
  Priority: Priority;
  DueDate: Date;
  TasksCollection: TasksCollectionInterface;
}
