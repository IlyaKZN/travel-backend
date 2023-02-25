export class CreateGroupDto {
  name: string;
  password: string;
  waypoints: string[];
  numberParticipants: number;
  minAge: number;
  maxAge: number;
}
