import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TasksCollection {
  @PrimaryGeneratedColumn('uuid')
  Collection_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;
}
