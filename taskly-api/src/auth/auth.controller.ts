import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Public()
  @Render('users/login')
  getLoginPage(): object {
    return {};
  }

  @Post('login')
  @Public()
  async loginUser(
    @Body() body: { Email: string; Password: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.validateUser(
        body.Email,
        body.Password,
      );
      const token = await this.authService.generateJwt(user);

      res.cookie('Authorization', `Bearer ${token}`, {
        httpOnly: true,
        secure: false,
      });

      res.redirect('/tasks-collection/view');
    } catch (error) {
      res.render('users/login', { errorMessage: 'Invalid credentials' });
    }
  }
}
