import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { PetMapper } from 'src/common/mappers/pet.mapper';
import { UsersService } from 'src/users/users.service';
import { CatService } from 'src/cat/cat.service';
import { Cat } from 'src/cat/entities/cat.entity';
import { User } from 'src/users/entities/user.entity';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PetService {
  @InjectRepository(Pet)
  private readonly repository: Repository<Pet>

  private readonly ENTITY_NAME = 'pet'

  constructor(
    private readonly mapper: PetMapper,
    private readonly userService: UsersService,
    private readonly catService: CatService,
  ) { }

  //userId comes from @Req in controller
  async createPetRelated(createPetDto: CreatePetDto, userId: number) {
    const user = await this.userService.checkExistanceById(userId)

    if (user) {
      const cat = await this.catService.findEntityById(createPetDto.animalId)
      const pet = await this.createSimplePet(user, cat, createPetDto.petName)

      //relations WITH pet 
      this.userService.updateRelationPet(user.id, pet)
      this.catService.updateRelationPet(cat.id, pet)

      //relactions OF pet
      this.updateRelationCat(pet.id, cat)
      this.updateRelationUser(pet.id, user)
    }
  }


  private async updateRelationCat(id: number, cat: Cat) {
    const pet = await this.repository.findOneBy({ id: id })

    if (pet) {
      if (!pet.cat) {
        pet.cat = cat
      }
      else throw new BadRequestException('This cat is already a pet')
    }
    else throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.ENTITY_NAME, id))
  }


  private async updateRelationUser(id: number, user: User) {
    const pet = await this.repository.findOneBy({ id: id })

    if (pet) {
      if (!pet.owner) {
        pet.owner = user
      }
      else throw new BadRequestException('This pet has already a owner')
    }
    else throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.ENTITY_NAME, id))
  }

  private async checkExistance(animalId: number) {
    const petRequested = await this.repository.findOneBy({ id: animalId })
    if (petRequested) throw new ConflictException(ErrorMessages.alreadyRegistered('pet'))
  }

  private async createSimplePet(user: User, cat: Cat, name: string) {
    //creates pet from mapper
    const pet = this.mapper.createPet(user, cat, name)
    //checks if that cat is already a Pet, if not exception
    await this.checkExistance(pet.cat.id)
    //creates Pet 
    return await this.repository.save(pet)
  }
}
