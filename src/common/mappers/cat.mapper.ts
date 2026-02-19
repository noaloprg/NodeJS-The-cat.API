import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "src/cat/dto/create-cat.dto";
import { ResponseCatDTO } from "src/cat/dto/response-cat.dto";
import { ResponseCreationCatBreedDTO } from "src/cat/dto/response-create-cat-breed.dto";
import { Cat } from "src/cat/entities/cat.entity";

@Injectable()
export class CatMapper {

    createCatFromDTO(createDTO: CreateCatDto) {
        const cat = new Cat()
        cat.externalId = createDTO.externalId.toLocaleLowerCase().trim()
        cat.height = createDTO.height
        cat.url = createDTO.url
        cat.width = createDTO.width
        return cat
    }

    toResponseDTO(cat: Cat) {
        const response = new ResponseCatDTO()
        response.createdAt = cat.createdAt
        response.deleteAt = cat.deletedAt
        response.updatedAt = cat.updatedAt
        response.externalId = cat.externalId
        response.height = cat.height
        response.width = cat.width
        response.url = cat.url
        response.id = cat.id
        response.petId = cat.pet?.id
        response.breedsId = (cat.breeds || []).map(br => br.id)
        return response
    }
    createDTOFromAPI(apiBody: any) {
        const createDTO = new CreateCatDto()
        createDTO.externalId = apiBody.id.toLocaleLowerCase().trim()
        createDTO.height = apiBody.height
        createDTO.url = apiBody.url
        createDTO.width = apiBody.width
        return createDTO
    }

    toResponseCreationAPI(created: number, duplicated: number, breedsCreated) {
        const response = new ResponseCreationCatBreedDTO()
        response.create = created
        response.duplicated = duplicated
        response.breedsCreated = breedsCreated
        return response
    }
}