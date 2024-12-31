import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  Task_id: string;

  @Column()
  Title: string;

  @Column()
  Description: string;
}
