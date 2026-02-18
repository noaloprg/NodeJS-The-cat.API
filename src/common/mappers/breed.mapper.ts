import { Injectable } from "@nestjs/common";
import { CreateBreedDto } from "src/breed/dto/create-breed.dto";
import { ResponseBreedDTO } from "src/breed/dto/response-breed.dto";
import { Breed } from "src/breed/entities/breed.entity";

@Injectable()
export class BreedMapper {
    createBreedFromDTO(createDTO: CreateBreedDto) {
        const breed = new Breed()
        breed.externalId = createDTO.externalId.toLocaleLowerCase().trim()
        breed.name = createDTO.name.toLocaleLowerCase().trim()
        breed.temperament = createDTO.temperament
        breed.description = createDTO.description
        breed.wikiUrl = createDTO.wikiUrl
        return breed
    }

    toResponseDTO(breed: Breed) {
        const response = new ResponseBreedDTO()
        response.id = breed.id
        response.externalId = breed.externalId
        response.name = breed.name
        response.createdAt = breed.createdAt
        response.deleteAt = breed.deletedAt
        response.updatedAt = breed.updatedAt
        response.wikiUrl = breed.wikiUrl
        response.description = breed.description
        response.origin = breed.origin
        response.temperament = breed.temperament
        return response
    }
}