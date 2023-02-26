import { User } from 'src/users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, now } from 'mongoose';
import { Message } from './message.entity';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'Message', default: [] },
    ],
  })
  messages: Message[];

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  members: User[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
