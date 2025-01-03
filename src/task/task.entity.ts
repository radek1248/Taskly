import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TasksCollection } from '../tasks-collection/tasks-collection.entity';
import { TaskInterface } from './task.interface';

@Entity('tasks')
export class Task implements TaskInterface {
  @PrimaryGeneratedColumn('uuid')
  Task_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;

  @ManyToOne(
    () => TasksCollection,
    (tasksCollection) => tasksCollection.Tasks,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'Collection_id' })
  TasksCollection: TasksCollection;
}
