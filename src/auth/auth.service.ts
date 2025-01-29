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

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findOne({ Name: username });
      if (!user) {
        throw new UnauthorizedException();
      }

      if (!(await bcrypt.compare(password, user.Password))) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.User_id, username: user.Name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.error(`Failed to sign in: ${error.message}`);
      throw new UnauthorizedException();
    }
  }
}
