import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Postmanager {
    @Prop()
    imgTitle: string;

    @Prop()
    title: string;

    @Prop()
    rasing: number;

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

export const PostmanagerSchema = SchemaFactory.createForClass(Postmanager);
