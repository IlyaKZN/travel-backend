import { Types } from 'mongoose';

export class CreateGroupDto {
  members: Types.ObjectId[];
}
