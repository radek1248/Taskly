import { IsNotEmpty, IsString } from 'class-validator';
import { UserInterface } from '../users.interface';

export class CreateUserDto
  implements Omit<UserInterface, 'User_id' | 'Created_at' | 'Updated_at'>
{
  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Password: string;
}
