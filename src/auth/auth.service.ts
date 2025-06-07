import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateJwt(user: any): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.User_id, email: user.Email },
      { secret: process.env.SECRET_KEY },
    );
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ Email: email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.Password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { Password, ...rest } = user;
    Password;
    return rest;
  }
}
