import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { BreedMapper } from 'src/common/mappers/breed.mapper';

@Injectable()
export class BreedService {
  @InjectRepository(Breed)
  private readonly repository: Repository<Breed>

  constructor(
    private mapper: BreedMapper
  ) { }

  async create(createBreedDto: CreateBreedDto): Promise<[Breed, boolean]> {
    const breedRequested = await this.existsByExternalId(createBreedDto.externalId)
    let created = false

    //if it doesnt exists it creates it
    if (!breedRequested) {
      const breed = this.mapper.createBreedFromDTO(createBreedDto)
      created = true
      return [await this.repository.save(breed), created]
    }
    //for relating with cat, it returnse the breed
    else return [breedRequested, created]

  }

  async findAll() {
    const allBreeds = await this.repository.find()
    return allBreeds.map(b => this.mapper.toResponseDTO(b))
  }

  //always returns a breed
  async existsByExternalId(exId: string) {
    const breed = await this.repository.findOneBy({ externalId: exId.toLocaleLowerCase() })

    if (!breed) return null
    return breed
  }
}
