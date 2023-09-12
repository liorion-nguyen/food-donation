import { Module } from '@nestjs/common';
import { ConfirmEmailController } from './confirm-email.controller';
import { ConfirmEmailService } from './confirm-email.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
 
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    ScheduleModule.forRoot(),
    UserModule,
  ],
  controllers: [ConfirmEmailController],
  providers: [ConfirmEmailService]
})
export class ConfirmEmailModule { }
