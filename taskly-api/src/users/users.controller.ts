import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/auth.constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('register')
  @Render('users/register')
  getRegisterPage(): object {
    return {};
  }

  @Post('register')
  @Public()
  @Redirect('/users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @Public()
  @Render('users/index')
  async findAll(): Promise<object> {
    return { users: await this.userService.findAll() };
  }

  @Get(':userId')
  @Render('users/detail')
  async findOne(@Param('userId') userId: string): Promise<object> {
    const user = await this.userService.findOne(userId);
    return { user };
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<string> {
    return await this.userService.deleteUser(userId);
  }
}
