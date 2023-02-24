import { ObjectId } from 'mongoose';

export class SearchGroupDto {
  name?: string;
  waypoint?: string;
  owner?: ObjectId;
  participant?: ObjectId;
}
