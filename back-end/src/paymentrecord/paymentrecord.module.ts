import { Module } from '@nestjs/common';
import { PaymentrecordController } from './paymentrecord.controller';
import { PaymentrecordService } from './paymentrecord.service';
import { MongooseModule }  from '@nestjs/mongoose';
import { PaymentrecordSchema } from './schema/paymentrecord.schema';
import { AbilityModule } from 'src/user/ability/ability.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Paymentrecord",
    schema: PaymentrecordSchema,
  }]),
  AbilityModule,
],
  controllers: [PaymentrecordController],
  providers: [PaymentrecordService]
})
export class PaymentrecordModule {}
