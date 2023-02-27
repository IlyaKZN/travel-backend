import { User } from 'src/users/entities/user.entity';

export class CreateGroupDto {
  members: User[];
}
