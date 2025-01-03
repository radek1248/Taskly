import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';
import { TasksCollectionInterface } from './tasks-collection.interface';

@Entity('TasksCollections')
export class TasksCollection implements TasksCollectionInterface {
  @PrimaryGeneratedColumn('uuid')
  Collection_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;

  @OneToMany(() => Task, (task) => task.TasksCollection, { cascade: true })
  Tasks: Task[];
}
