import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity('TasksCollection')
export class TasksCollection {
  @PrimaryGeneratedColumn('uuid')
  Collection_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;

  @OneToMany(() => Task, (task) => task.TasksCollection, { cascade: true })
  Tasks: Task[];
}
