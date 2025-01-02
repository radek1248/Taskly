import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TasksCollection } from '../tasks-collection/tasks-collection.entity';

@Entity('Tasks')
export class Task {
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
