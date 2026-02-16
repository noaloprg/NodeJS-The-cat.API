import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ResponseUserDTO } from "src/users/dto/response-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";
import { Verification } from "src/verification/entities/verification.entity";

@Injectable()
export class UserMapper {
    createUserFromDTO(createDTO: CreateUserDto) {
        const user = new User()
        user.mail = createDTO.mail
        user.name = createDTO.name
        user.password = createDTO.password
        return user
    }

    toResponseDTO(user: User) {
        const response = new ResponseUserDTO()
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
}