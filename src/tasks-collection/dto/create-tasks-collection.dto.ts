import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTasksCollectionDto {
  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Description: string;
}
