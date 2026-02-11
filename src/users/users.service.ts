import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(idUser: number) {
    const user = await this.repository.findOneBy({ id: idUser })

    if (!user) throw new NotFoundException(this.notFoundMessage(idUser));

    return UserMapper.toResponseDTO(user)
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const userRequested = await this.repository.findOneBy({ id: idUser })

    if (!userRequested) throw new NotFoundException(this.notFoundMessage(idUser));
    //user with new update values
    const userUpdated = UserMapper.updateUserFromDTO(userRequested, updateUserDto)

    //user with updatedDate updated
    const saved = await this.repository.save(userUpdated)
    return UserMapper.toResponseDTO(saved)
  }

  async remove(idUser: number) {
    const userRequested = await this.repository.findOneBy({ id: idUser })

    if (!userRequested) throw new NotFoundException(this.notFoundMessage(idUser));

    //role validation for Delete
    if (userRequested.role == UserType.ADMIN) throw new ForbiddenException(`Users with Admin role cannot be deleted`)

    const userDeleted = await this.repository.softRemove(userRequested)

    return UserMapper.toResponseDTO(userDeleted)
  }

  private notFoundMessage(id: number) {
    return `User with id ${id} was not founded`
  }
}
