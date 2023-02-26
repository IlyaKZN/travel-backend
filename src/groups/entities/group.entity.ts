import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';

export type GroupDocument = HydratedDocument<Group>;

@Schema({ strictQuery: true })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  waypoints: string[];

  @Prop({ type: String, ref: 'User', required: true })
  owner: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User', required: true }],
  })
  participants: User[];

  @Prop()
  numberParticipants: number;

  @Prop()
  minAge: number;

  @Prop()
  maxAge: number;

  @Prop({ type: Types.ObjectId, ref: 'Chat', required: true })
  chat: Chat;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
