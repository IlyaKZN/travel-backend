import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type GroupDocument = HydratedDocument<Group>;

@Schema({ strictQuery: true })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  waypoints: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  participants: User[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
