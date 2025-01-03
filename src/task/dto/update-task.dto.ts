import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class TasksCollectionDto {
  @IsNotEmpty()
  @IsUUID()
  Collection_id: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description: string;

  @IsOptional()
  @IsObject()
  TasksCollection: TasksCollectionDto;
}
