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

  async create(createBreedDto: CreateBreedDto) {
    if (!this.existsByExternalId(createBreedDto.externalId)) {
      const breed = this.mapper.createBreedFromDTO(createBreedDto)
      return await this.repository.save(breed)
    }
    //returns entity for relations with cat
    else return null
    //doesnt throw exception if exists
  }

  async findAll() {
    const allBreeds = await this.repository.find()
    return allBreeds.map(b => this.mapper.toResponseDTO(b))
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }


  remove(id: number) {
    return `This action removes a #${id} breed`;
  }

  existsByExternalId(exId: string) {
    const breed = this.repository.findOneBy({ externalId: exId })

    let exists = true
    if (!breed) exists = false
    return exists
  }
}
