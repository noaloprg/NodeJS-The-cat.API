import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { PetMapper } from 'src/common/mappers/pet.mapper';
import { UsersService } from 'src/users/users.service';
import { CatService } from 'src/cat/cat.service';
import { ErrorMessages } from 'src/common/constants/error-messages';

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
    //validates user exists
    const user = await this.userService.checkExistanceById(userId)
    //validates cat  exists
    const cat = await this.catService.findEntityById(createPetDto.animalId)
    //verifies that the cat is not a pet
    this.checkExistanceCat(cat.id)

    const pet = await this.repository.create({
      petName: createPetDto.petName,
      //relates to cat and user
      cat: cat,
      owner: user,
    })
    await this.repository.save(pet)
    return await this.mapper.toResponseDTO(pet)
  }
  private async checkExistanceCat(animalId: number) {
    //list insisde a list
    const petRequested = await this.repository.findOneBy({ cat: { id: animalId } })
    if (petRequested) throw new ConflictException(ErrorMessages.alreadyRegistered('pet'))
  }

}
