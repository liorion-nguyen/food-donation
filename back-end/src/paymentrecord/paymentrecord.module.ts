import { Module } from '@nestjs/common';
import { PaymentrecordController } from './paymentrecord.controller';
import { PaymentrecordService } from './paymentrecord.service';
import { MongooseModule }  from '@nestjs/mongoose';
import { PaymentrecordSchema } from './schema/paymentrecord.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Paymentrecord",
    schema: PaymentrecordSchema,
  }])],
  controllers: [PaymentrecordController],
  providers: [PaymentrecordService]
})
export class PaymentrecordModule {}
