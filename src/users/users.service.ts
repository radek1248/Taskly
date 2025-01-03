import { Injectable } from '@nestjs/common';
import { EntityManager, FindOneOptions } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.entityManager.find(User);
    } catch (error) {
      console.error(`Failed to fetch all users: ${error.message}`);
      return undefined;
    }
  }

  async findOne(userId: string): Promise<User> {
    try {
      const criteria: FindOneOptions = { where: { User_id: userId } };

      return await this.entityManager.findOne(User, criteria);
    } catch (error) {
      console.error(`Failed to fetch user ${userId}: ${error.message}`);
      return undefined;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const currentDate = new Date();

      const user = {
        ...createUserDto,
        Created_at: currentDate,
        Updated_at: currentDate,
      };

      return await this.entityManager.save(User, user);
    } catch (error) {
      console.error(`Failed to create user: ${error.message}`);
      return undefined;
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const { Name, Email, Password } = updateUserDto;

      const criteria = { User_id: userId };

      const updatedUser = {
        Name,
        Email,
        Password,
        Updated_at: new Date(),
      };

      return await this.entityManager.update(User, criteria, updatedUser);
    } catch (error) {
      console.error(`Failed to update user ${userId}: ${error.message}`);
      return undefined;
    }
  }

  async deleteUser(userId: string): Promise<string> {
    try {
      await this.entityManager.delete(User, { User_id: userId });

      return `User ${userId} has been deleted`;
    } catch (error) {
      console.error(`Failed to delete user ${userId}: ${error.message}`);
      return undefined;
    }
  }
}
