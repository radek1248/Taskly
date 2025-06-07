import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './auth/auth.constants';

@Controller()
@Public()
export class AppController {
  @Get()
  @Render('home')
  renderHomePage() {
    return {};
  }
}
