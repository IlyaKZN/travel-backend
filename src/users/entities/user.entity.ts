import { Message } from './../../chats/entities/message.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsEmail, IsDate, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ unique: true })
  @IsNotEmpty()
  phoneNumber: string;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  avatar: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsDate()
  birthDate: Date;

  @Column()
  friends: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  status: string;

  @Column()
  @OneToMany(() => Group, (group) => group.owner)
  ownerGroups: Group[];

  @Column()
  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];

  @Column()
  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @Column()
  @OneToMany(() => Message, (message) => message.owner)
  messages: Message[];

  @Column()
  @OneToMany(() => User, (user) => user.subscriptions)
  subscribers: User[];

  @Column()
  @OneToMany(() => User, (user) => user.subscribers)
  subscriptions: User[];
}
