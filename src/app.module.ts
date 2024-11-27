import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RegistrationModule } from './users/registration/registration.module';

@Module({
  imports: [UsersModule, RegistrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
