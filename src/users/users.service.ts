import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from 'src/mappers/user.mapper';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>

  create(createUserDto: CreateUserDto) {
    const user = UserMapper.createUserFromDTO(createUserDto)
    this.repository.save(user)
    return UserMapper.toResponseDTO(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
