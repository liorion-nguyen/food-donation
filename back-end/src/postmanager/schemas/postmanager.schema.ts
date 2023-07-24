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
    releaseDate: string;

    @Prop()
    view: string;
    
    @Prop()
    status: string;
}

export const PostmanagerSchema = SchemaFactory.createForClass(Postmanager);
