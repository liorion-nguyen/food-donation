import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { PostmanagerModule } from './postmanager/postmanager.module';
import { RewardModule } from './reward/reward.module';
import { PaymentrecordModule } from './paymentrecord/paymentrecord.module';
import { DecryptAccesstokenModule } from './decrypt-accesstoken/decrypt-accesstoken.module';
import { ConfirmEmailModule } from './confirm-email/confirm-email.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilityModule } from './user/ability/ability.module';
import { AbilitiesGuard } from './user/ability/ability.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    LocationModule,
    PostmanagerModule,
    RewardModule,
    PaymentrecordModule,
    DecryptAccesstokenModule,
    ConfirmEmailModule,
    AbilityModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard,
    }],

})

export class AppModule { }

// Module gốc, quản lý các thành phần khác của ứng dụng như controller, service hoặc import.
