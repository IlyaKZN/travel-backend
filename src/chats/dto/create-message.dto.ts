import { Types } from 'mongoose';

export class CreateMessageDto {
  text: string;
  userId: Types.ObjectId;
  chatId: string;
}
