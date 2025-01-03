import { IsOptional, IsString } from 'class-validator';
import { UserInterface } from '../users.interface';

export class UpdateUserDto
  implements Omit<UserInterface, 'User_id' | 'Created_at' | 'Updated_at'>
{
  @IsOptional()
  @IsString()
  Name: string;

  @IsOptional()
  @IsString()
  Email: string;

  @IsOptional()
  @IsString()
  Password: string;
}
