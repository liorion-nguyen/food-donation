import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Paymentrecord {
    @Prop()
    event: string;

    @Prop()
    imgEvent: string;

    @Prop()
    moneyUsed: string;

    @Prop()
    usedDate: string;

    @Prop()
    status: string;
}

export const PaymentrecordSchema = SchemaFactory.createForClass(Paymentrecord);
