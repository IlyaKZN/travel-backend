import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  owner: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
