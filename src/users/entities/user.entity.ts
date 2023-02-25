import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Group } from 'src/groups/entities/group.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  avatar: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  friends: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  status: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Group' }],
  })
  groups: Group[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  subscribers: User[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  subscriptions: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
