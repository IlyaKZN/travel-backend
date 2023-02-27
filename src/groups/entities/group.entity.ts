import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  waypoints: string[];

  @Column()
  @IsNotEmpty()
  numberParticipants: number;

  @Column()
  minAge: number;

  @Column()
  maxAge: number;

  @Column()
  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.ownerGroups)
  owner: User;

  @Column()
  @IsNotEmpty()
  @ManyToMany(() => User, (user) => user.groups)
  members: User[];

  @Column()
  @IsNotEmpty()
  @OneToOne(() => Chat, (chat) => chat.group)
  chat: Chat;
}
