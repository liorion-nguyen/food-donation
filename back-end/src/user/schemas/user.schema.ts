import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})

export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ required: true })
  orgId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
