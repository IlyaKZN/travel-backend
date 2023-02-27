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

  @Column('text', { array: true })
  @IsNotEmpty()
  waypoints: string[];

  @Column()
  @IsNotEmpty()
  numberParticipants: number;

  @Column()
  minAge: number;

  @Column()
  maxAge: number;

  @ManyToOne(() => User, (user) => user.ownerGroups)
  owner: User;

  @ManyToMany(() => User, (user) => user.groups)
  participants: User[];

  @OneToOne(() => Chat, (chat) => chat.group)
  chat: Chat;
}
