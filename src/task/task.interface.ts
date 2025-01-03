import { TasksCollectionInterface } from '../tasks-collection/tasks-collection.interface';

export class TaskInterface {
  Task_id: string;
  Title: string;
  Description: string;
  TasksCollection: TasksCollectionInterface;
}
