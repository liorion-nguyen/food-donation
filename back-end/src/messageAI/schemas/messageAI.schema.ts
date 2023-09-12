import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
  })
export class MessageAI {
    @Prop()
    author: string;

    @Prop()
    content: string;
}

export const MessageAISchema = SchemaFactory.createForClass(MessageAI);
