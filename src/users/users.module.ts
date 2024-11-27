import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';

@Module({
  providers: [],
  imports: [RegistrationModule],
})
export class UsersModule {}
