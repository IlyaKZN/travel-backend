import { Message } from './../../chats/entities/message.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsEmail, IsDate, IsNotEmpty } from 'class-validator';

@Entity()
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

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  @IsDate()
  birthDate: Date;

  @Column({ nullable: true })
  friends: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  status: string;

  @OneToMany(() => Group, (group) => group.owner)
  ownerGroups: Group[];

  @ManyToMany(() => Group, (group) => group.participants)
  @JoinTable()
  groups: Group[];

  @ManyToMany(() => Chat, (chat) => chat.members)
  @JoinTable()
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.owner, { cascade: true })
  messages: Message[];

  @OneToMany(() => User, (user) => user.subscriptions)
  subscribers: User[];

  @OneToMany(() => User, (user) => user.subscribers)
  subscriptions: User[];
}
