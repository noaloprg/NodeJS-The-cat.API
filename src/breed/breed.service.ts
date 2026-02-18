import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedService {
  @InjectRepository(Breed)
  private readonly repository: Repository<Breed>

  create(createBreedDto: CreateBreedDto) {
    return 'This action adds a new breed';
  }

  findAll() {
    return `This action returns all breed`;
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
