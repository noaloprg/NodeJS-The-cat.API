import { Injectable } from "@nestjs/common";
import { Pet } from "src/pet/entities/pet.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ResponseUserDTO } from "src/users/dto/response-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";
import { Verification } from "src/verification/entities/verification.entity";
import { PetMapper } from "./pet.mapper";
import { ResponseUserPetDTO } from "src/users/dto/response-user-pets.dto";

@Injectable()
export class UserMapper {

    constructor(private readonly petMapper: PetMapper) { }

    createUserFromDTO(createDTO: CreateUserDto) {
        const user = new User()
        user.mail = createDTO.mail.toLocaleLowerCase().trim()
        user.name = createDTO.name.toLocaleLowerCase().trim()
        user.password = createDTO.password
        return user
    }

    toResponseDTO(user: User) {
        let response = new ResponseUserDTO()
        response = this.mapProperties(response, user)
        return response
    }


    updateUserFromDTO(user: User, updateDTO: UpdateUserDto): User {
        return Object.assign(user, updateDTO)
    }

    createUserFromVerification(verif: Verification) {
        const createDTO = new CreateUserDto()
        createDTO.mail = verif.targetEmail
        createDTO.name = verif.name
        createDTO.password = verif.password

        return this.createUserFromDTO(createDTO)
    }

    toResponseUserPetDTO(user: User) {
        let response = new ResponseUserPetDTO()
        response = this.mapProperties(response, user)
        response.pets = (user.pets || []).map(pet => this.petMapper.toResponseDTO(pet))
        return response
    }

    // * solo para response
    private mapProperties(response: any, user: User) {
        response.id = user.id
        response.mail = user.mail
        response.name = user.name
        response.role = user.role
        response.language = user.language
        response.createdAt = user.createdAt
        response.updatedAt = user.updatedAt
        response.deletedAt = user.deletedAt
        return response
    }
}