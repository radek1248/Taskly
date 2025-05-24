import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TasksCollection } from '../tasks-collection/tasks-collection.entity';
import { TaskInterface } from './task.interface';
import { Priority } from './dto/create-task.dto';

@Entity('tasks')
export class Task implements TaskInterface {
  @PrimaryGeneratedColumn('uuid')
  Task_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;

  @Column({ default: Priority.normal })
  Priority: Priority;

  @ManyToOne(
    () => TasksCollection,
    (tasksCollection) => tasksCollection.Tasks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'Collection_id' })
  TasksCollection: TasksCollection;
}
