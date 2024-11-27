import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';

@Module({
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
