import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
interface Actions {
    likes: {
        like: Array<string>,
        love: Array<string>,
        haha: Array<string>,
        sad: Array<string>,
    },
    comments: Array<object>,
    shares: Array<string>,
}

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

    @Prop()
    author: string;

    @Prop({ type: Object })
    actions: Actions;

}

export const PostmanagerSchema = SchemaFactory.createForClass(Postmanager);
