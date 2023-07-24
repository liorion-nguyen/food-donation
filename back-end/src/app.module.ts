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
    PaymentrecordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}