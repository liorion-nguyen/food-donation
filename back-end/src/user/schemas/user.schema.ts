import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface OrgId {
  Location: boolean;
  Postmanager: boolean;
  Paymentrecord: boolean;
  Reward: boolean;
}

interface Information {
  Category: string;
  Subname: string;
  Work: string;
  Education: string;
  Live: string;
  Countryside: string;
  Relationship: string;
  Join: string;
  Web: string;
  Instagram: string;
  Facebook: string;
  Gender: string;
  Datebird: string; 
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullname: string;

  @Prop({ required: true })
  contact: string;

  @Prop()
  avatar: string;

  @Prop()
  cover: string;

  @Prop()
  bio: string;

  @Prop({ type: Object })
  information: Information;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ type: Object, required: true })
  orgId: OrgId;

  @Prop({ required: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
