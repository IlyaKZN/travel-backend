import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export type CatDocument = Cat & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  avatar: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: string;

  @Prop()
  friends: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
