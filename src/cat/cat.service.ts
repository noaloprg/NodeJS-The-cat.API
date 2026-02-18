import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCatWithBreedDTO } from './dto/create-cat-breed.dto';
import { BreedService } from 'src/breed/breed.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { CatMapper } from 'src/common/mappers/cat.mapper';
import { BreedMapper } from 'src/common/mappers/breed.mapper';
import { Breed } from 'src/breed/entities/breed.entity';
import { ResponseCreationCatBreedDTO } from './dto/response-create-cat-breed.dto';

@Injectable()

export class CatService {

  @InjectRepository(Cat)
  private readonly repository: Repository<Cat>

  constructor(
    private readonly httpService: HttpService,
    private readonly breedService: BreedService,
    private readonly mapper: CatMapper,
    private readonly breedMapper: BreedMapper
  ) { }

  async create(createDTO: CreateCatDto) {
    if (!await this.existsByExternalId(createDTO.externalId)) {
      const cat = this.mapper.createCatFromDTO(createDTO)
      return await this.repository.save(cat)
    }
    //returns entity for relations with cat
    else return null
    //doesnt throw exception if exists
  }

  async createCatBreedFromApi(amount: number) {
    //list of cats with list of breeds
    const bodyAPi = await this.getCatsFromApi(amount)
    const createDTOs = await this.transformBodyToDTO(bodyAPi);
    let created = 0
    let duplicated = 0

    if (amount > 0) {
      for (const catDTO of createDTOs) {
        // creates Cat from createCatDTO
        const cat = await this.create(catDTO.cat)

        if (!cat) {
          duplicated += 1
          //next cat from DTO
          continue
        }

        //createBreedDTO
        for (const breedDTO of catDTO.listBreeds) {
          //if it creates the breed 
          const breed = await this.breedService.create(breedDTO)
          //relate both entities
          if (breed) {
            await this.breedService.updateRelations(breed.id, cat)
            this.updateRelations(cat.id, breed)
          }
        }
        created += 1
      }

      const response = this.mapper.toResponseCreationAPI(created, duplicated)
      return response
    } else throw new BadRequestException('value must be positive')
  }

  async getAllCats() {
    const allCats = await this.repository.find()
    return allCats.map(c => this.mapper.toResponseDTO(c))
  }

  // * transforms response from API into CreateCatBreedDTO
  private async transformBodyToDTO(bodyApi: any) {
    // bodyApi -> list of cats (cats -> list of breeds)
    const catsWithBreeds: CreateCatWithBreedDTO[] = bodyApi.map(
      //cat from API
      cat => {
        const dto = new CreateCatWithBreedDTO()

        //creates CreateCatDTO
        dto.cat = this.mapper.createDTOFromAPI(cat)

        //if there are breeds
        if (cat.breeds) {
          //assigns a list of breeds to the DTO
          //cat.breeds or empty list in case there are no breeds (UNDIFINED EXCEPTION)
          dto.listBreeds = (cat.breeds || []).map(b => this.breedMapper.createDTOfromAPI(b))
        }
        //creates list of CreateBreedDTO
        else dto.listBreeds = []
        return dto
      })
    return catsWithBreeds
  }

  // * CATS + BREEDS RANDOM
  // amount -> num of cats admin requests
  private async getCatsFromApi(amount: number) {
    try {
      /*
      tranforms Observable into Promise<AxiosResponse> to access AxiosResponse methods
      */
      const apiReponse = await firstValueFrom(this.httpService.get('images/search', {
        params: { limit: amount, has_breeds: 1 },
      }))
      return apiReponse.data;
    }
    catch (error) {
      const status = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error?.message || 'Error al conectar con Cat API';
      throw new HttpException(message, status);
    }
  }

  async existsByExternalId(exId: string) {
    const cat = await this.repository.findOneBy({ externalId: exId.toLocaleLowerCase() })
    let exists = true
    if (!cat) exists = false
    return exists
  }


  async updateRelations(id: number, breed: Breed) {
    //loads cat with the breeds related
    const cat = await this.repository.findOne({
      where: { id },
      //if not breeds[] is always empty
      relations: ['breeds']
    })

    if (cat) {
      //if its empty creates array 
      if (!cat.breeds) cat.breeds = []
      cat.breeds.push(breed)
      await this.repository.save(cat)
    }
  }
}
