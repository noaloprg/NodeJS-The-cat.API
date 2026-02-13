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

  constructor(private readonly userMapper: UserMapper) { }

  private readonly RESOURCE_NAME = 'User'

  async create(createUserDto: CreateUserDto) {
    const tempUser = this.userMapper.createUserFromDTO(createUserDto)

    const userExist = await this.repository.exists({ where: { mail: tempUser.mail } })

    if (userExist)
      throw new ConflictException('User already exists in DB');

    const userCreated = await this.repository.save(tempUser)
    return this.userMapper.toResponseDTO(userCreated)
  }

  async findAll() {
    const usersArray = await this.repository.find()
    return usersArray.map(user => this.userMapper.toResponseDTO(user))
  }

  async findOne(idUser: number) {
    const user = await this.checkExistanceById(idUser, ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idUser))


    return this.userMapper.toResponseDTO(user)
  }

  async findOneByMail(mail: string) {
    const user = await this.repository.findOneBy({ mail: mail })
    if (!user) throw new NotFoundException(ErrorMessages.notFoundByStringMessage(this.RESOURCE_NAME, 'mail', mail));

    return this.userMapper.toResponseDTO(user)
  }

  //gets user with password 
  async getUserByMail(mail: string) {
    const user = await this.repository.findOneBy({ mail: mail })
    if (!user) throw new NotFoundException(ErrorMessages.notFoundByStringMessage(this.RESOURCE_NAME, 'mail', mail));
    return user
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const userRequested = await this.checkExistanceById(idUser, ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idUser))

    //user with new update values
    const userUpdated = this.userMapper.updateUserFromDTO(userRequested, updateUserDto)

    //user with updatedDate updated
    const saved = await this.repository.save(userUpdated)
    return this.userMapper.toResponseDTO(saved)
  }

  async remove(idUser: number) {
    const userRequested = await this.checkExistanceById(idUser, ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idUser))

    //role validation for Delete
    if (userRequested.role == UserType.ADMIN) throw new ForbiddenException(`Users with Admin role cannot be deleted`)

    const userDeleted = await this.repository.softRemove(userRequested)

    return this.userMapper.toResponseDTO(userDeleted)
  }

  private async checkExistanceById(idUser: number, message: string) {
    const userRequested = await this.repository.findOneBy({ id: idUser })

    if (!userRequested) throw new NotFoundException(message);
    return userRequested
  }
}
