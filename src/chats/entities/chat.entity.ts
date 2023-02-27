import { Group } from 'src/groups/entities/group.entity';
import { IsNotEmpty } from 'class-validator/types/decorator/decorators';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToOne, ManyToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @Column()
  messages: Message[];

  @Column()
  @IsNotEmpty()
  @ManyToMany(() => User, (user) => user.chats)
  members: User[];

  @Column()
  @OneToOne(() => Group, (group) => group.chat)
  group: Group;
}
