import { Controller, Post } from '@nestjs/common';

@Controller('registration')
export class RegistrationController {
  @Post()
  async register() {
    return 'Registration successful';
  }
}
