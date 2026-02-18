import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { PetMapper } from 'src/common/mappers/pet.mapper';
import { UsersService } from 'src/users/users.service';
import { CatService } from 'src/cat/cat.service';

@Injectable()
export class PetService {
  @InjectRepository(Pet)
  private readonly repository: Repository<Pet>

  constructor(
    private readonly mapper: PetMapper,
    private readonly userService: UsersService,
    private readonly catService: CatService,
  ) { }

  create(createPetDto: CreatePetDto) {
    return 'This action adds a new pet';
  }

  findAll() {
    return `This action returns all pet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
