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
import { map } from 'rxjs';

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
    const user = await this.userService.getById(userId)
    //validates cat  exists
    const cat = await this.catService.findEntityById(createPetDto.animalId)
    //verifies that the cat is not a pet
    await this.checkExistanceCat(cat.id)

    const pet = await this.repository.create({
      petName: createPetDto.petName,
      //relates to cat and user
      cat: cat,
      owner: user,
    })
    await this.repository.save(pet)
    return await this.mapper.toResponseDTO(pet)
  }

  async getAllUserPets(idUser: number) {
    const pets = await this.repository.find({
      where: { owner: { id: idUser } },
      relations: ['cat']
    })
    return pets.map(p => this.mapper.toResponseDTO(p))
  }

  async freePet(idUser: number, idPet: number) {
    const pet = await this.findPetbyOwner(idUser, idPet)
    pet.owner = null
    this.repository.save(pet)
    return this.mapper.toResponseDTO(pet)
  }

  async getAllPets() {
    return (await this.repository.find(
      { relations: ['owner'] }
    )).map(p => this.mapper.toResponseDTO(p))
  }

  async adoptPet(idUser: number, idPet: number) {
    //verifies if pet and user exists
    const pet = await this.getById(idPet)
    const user = await this.userService.getById(idUser)

    //verifies that pet is orphan
    if (!pet.owner) {
      pet.owner = user
      await this.repository.save(pet)
    }
    else throw new ConflictException('Pet belongs to another owner')
    return this.mapper.toResponseDTO(pet)
  }

  async removePetFromUser(idPet: number) {
    const pet = await this.getById(idPet)
    pet.owner = null
    return this.mapper.toResponseDTO(await this.repository.save(pet))
  }

  private async findPetbyOwner(idUser: number, idPet: number) {
    const pet = await this.repository.findOne({
      where: { owner: { id: idUser }, id: idPet },
      relations: ['cat', 'owner']
    })

    if (!pet) throw new NotFoundException('Pet with that owner not found')
    return pet
  }

  private async getById(idPet: number) {
    const pet = await this.repository.findOne({
      where: { id: idPet },
      relations: ['cat', 'owner']
    })

    if (!pet) throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.ENTITY_NAME, idPet))
    return pet
  }

  private async checkExistanceCat(animalId: number) {
    //list insisde a list
    const petRequested = await this.repository.findOne({
      where: { cat: { id: animalId } }
    })
    if (petRequested) throw new ConflictException(ErrorMessages.alreadyRegistered('pet'))
  }
}
