import { Injectable } from "@nestjs/common";
import { Cat } from "src/cat/entities/cat.entity";
import { CreatePetDto } from "src/pet/dto/create-pet.dto";
import { ResponsePetDTO } from "src/pet/dto/response-pet.dto";
import { Pet } from "src/pet/entities/pet.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class PetMapper {
    createPet(owner : User, cat :Cat, name:string) {
        const pet = new Pet()
        pet.cat = cat
        pet.owner = owner
        pet.petName = name
        return pet
    }

    toResponseDTO(pet: Pet) {
        const response = new ResponsePetDTO()
        response.createdAt = pet.createdAt
        response.deleteAt = pet.deletedAt
        response.updatedAt = pet.updatedAt
        response.id = pet.id
        response.ownerId = pet.owner.id
        response.animalId = pet.cat.id
        return response
    }
}