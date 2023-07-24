/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Location {
    @Prop()
    imgAddress: string;

    @Prop()
    address: string;

    @Prop()
    location: string;
    @Prop()
    description: string;
    
    @Prop()
    addedDate: string;
    @Prop()
    status: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);