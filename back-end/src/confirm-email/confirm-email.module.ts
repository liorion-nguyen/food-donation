import { Module } from '@nestjs/common';
import { ConfirmEmailController } from './confirm-email.controller';
import { ConfirmEmailService } from './confirm-email.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [ConfirmEmailController],
  providers: [ConfirmEmailService]
})
export class ConfirmEmailModule { }
