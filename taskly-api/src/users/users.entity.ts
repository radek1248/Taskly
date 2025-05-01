import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from './users.interface';
import { TasksCollection } from '../tasks-collection/tasks-collection.entity';

@Entity('users')
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  User_id: string;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  Created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  Updated_at: Date;

  @OneToMany(() => TasksCollection, (collection) => collection.User, {
    cascade: true,
  })
  TasksCollections: TasksCollection[];
}
