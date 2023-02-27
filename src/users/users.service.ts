import { Repository, Like, Not } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { hashPassword } from 'src/utils/utils-functions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const password = hashPassword(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      password,
    });
  }

  search(searchUserDto: SearchUserDto, userId: number) {
    const { searchValue } = searchUserDto;

    return this.userRepository.find({
      where: [
        {
          firstName: Like(`%${searchValue}%`),
          id: Not(userId),
        },
        {
          lastName: Like(`%${searchValue}%`),
          id: Not(userId),
        },
      ],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
