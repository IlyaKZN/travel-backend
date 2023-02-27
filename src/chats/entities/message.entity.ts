import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @Column()
  text: string;

  @Column()
  @ManyToOne(() => User, (user) => user.messages)
  owner: User;

  @Column()
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
