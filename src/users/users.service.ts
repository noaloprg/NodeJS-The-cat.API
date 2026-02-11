import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from 'src/mappers/user.mapper';
import { UserType } from './enums/User-role.enum';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>

  async create(createUserDto: CreateUserDto) {
    const tempUser = UserMapper.createUserFromDTO(createUserDto)

    const userExist = await this.repository.exists({ where: { mail: tempUser.mail } })

    if (userExist) {
      throw new ConflictException('User already exists in DB')
    }

    const userCreated = await this.repository.save(tempUser)
    return UserMapper.toResponseDTO(userCreated)
  }

  async findAll() {
    const usersArray = await this.repository.find()
    return usersArray.map(user => UserMapper.toResponseDTO(user))
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
