import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TasksCollection')
export class TasksCollection {
  @PrimaryGeneratedColumn('uuid')
  Collection_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;
}
