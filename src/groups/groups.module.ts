import { Module } from '@nestjs/common';
import { ChatsModule } from 'src/chats/chats.module';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), ChatsModule, UsersModule],
  exports: [GroupsService],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
