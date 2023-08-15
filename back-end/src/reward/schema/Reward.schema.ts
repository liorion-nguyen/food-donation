import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Reward {
    @Prop() 
    imgInformation: string;

    @Prop()
    VoucherName: string;

    @Prop()
    VoucherCode: number;

    @Prop()
    ExpiredDate: string;

    @Prop()
    Description: string;

    @Prop()
    releaseDate: string;

    @Prop()
    status: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
