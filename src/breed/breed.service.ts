import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { BreedMapper } from 'src/common/mappers/breed.mapper';
import { Cat } from 'src/cat/entities/cat.entity';

@Injectable()
export class BreedService {
  @InjectRepository(Breed)
  private readonly repository: Repository<Breed>

  constructor(
    private mapper: BreedMapper
  ) { }

  async create(createBreedDto: CreateBreedDto) {
    if (!await this.existsByExternalId(createBreedDto.externalId)) {
      const breed = this.mapper.createBreedFromDTO(createBreedDto)
      return await this.repository.save(breed)
    }
    //returns entity for relations with cat
    else return null
    //doesnt throw exception if exists
  }

  async updateRelations(id: number, cat: Cat) {
    //loads breed with the cats related
    const breed = await this.repository.findOne({
      where: { id },
      relations: ['cats']
    })

    if (breed) {
      //if its empty creates array 
      if (!breed.cats) breed.cats = []

      breed.cats.push(cat)
      this.repository.save(breed)
    }
  }

  async findAll() {
    const allBreeds = await this.repository.find()
    return allBreeds.map(b => this.mapper.toResponseDTO(b))
  }

  async existsByExternalId(exId: string) {
    const breed = await this.repository.findOneBy({ externalId: exId.toLocaleLowerCase() })

    let exists = true
    if (!breed) exists = false
    return exists
  }
}
