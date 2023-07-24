import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Reward {
    @Prop()
    imgInformation: string;

    @Prop()
    Information: string;

    @Prop()
    expiredDate: string;

    @Prop()
    activeDate: string;
    
    @Prop()
    status: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
