import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './enums/User-role.enum';
import { UserMapper } from 'src/common/mappers/user.mapper';
import { ErrorMessages as ErrorMessages } from 'src/common/constants/error-messages';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>

  private readonly RESOURCE_NAME = 'User'

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

    if (!user) throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idUser));

    return UserMapper.toResponseDTO(user)
  }

  async findOneByMail(mail: string) {
    const user = await this.repository.findOneBy({ mail: mail })

    if (!user) throw new NotFoundException(ErrorMessages.notFoundByStringMessage(this.RESOURCE_NAME, 'mail', mail));

    return UserMapper.toResponseDTO(user)
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const userRequested = await this.repository.findOneBy({ id: idUser })

    if (!userRequested) throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idUser));
    //user with new update values
    const userUpdated = UserMapper.updateUserFromDTO(userRequested, updateUserDto)

    //user with updatedDate updated
    const saved = await this.repository.save(userUpdated)
    return UserMapper.toResponseDTO(saved)
  }

  async remove(idUser: number) {
    const userRequested = await this.repository.findOneBy({ id: idUser })

    if (!userRequested) throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idUser));

    //role validation for Delete
    if (userRequested.role == UserType.ADMIN) throw new ForbiddenException(`Users with Admin role cannot be deleted`)

    const userDeleted = await this.repository.softRemove(userRequested)

    return UserMapper.toResponseDTO(userDeleted)
  }
}
