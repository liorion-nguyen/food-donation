import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface OrgId {
  Location: boolean;
  Postmanager: boolean;
  Paymentrecord: boolean;
  Reward: boolean;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  contact: string;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ type: Object, required: true }) 
  orgId: OrgId;

  @Prop({ required: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
