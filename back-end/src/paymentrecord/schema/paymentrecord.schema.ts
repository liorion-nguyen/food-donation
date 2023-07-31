import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Paymentrecord {
    @Prop()
    title: string;

    @Prop()
    imgTitle: string;

    @Prop()
    MoneyUsed: number;

    @Prop()
    type: string;

    @Prop()
    location: string;

    @Prop()
    address: string;

    @Prop()
    description: string;

    @Prop()
    releaseDate: string;

    @Prop()
    status: string;
}

export const PaymentrecordSchema = SchemaFactory.createForClass(Paymentrecord);
