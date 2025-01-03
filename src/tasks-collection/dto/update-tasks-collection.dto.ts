import { IsOptional, IsString } from 'class-validator';

export class UpdateTasksCollectionDto {
  @IsOptional()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description: string;
}
