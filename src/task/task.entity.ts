import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  Task_id: string;

  @Column()
  Collection_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;
}
