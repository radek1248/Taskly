import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../task/task.entity';
import { TasksCollectionInterface } from './tasks-collection.interface';
import { User } from '../users/users.entity';

@Entity('tasksCollections')
export class TasksCollection implements TasksCollectionInterface {
  @PrimaryGeneratedColumn('uuid')
  Collection_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;

  @ManyToOne(() => User, (user) => user.TasksCollections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'User_id' })
  User: User;

  @OneToMany(() => Task, (task) => task.TasksCollection, { cascade: true })
  Tasks: Task[];
}
