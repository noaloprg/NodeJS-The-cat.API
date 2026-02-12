import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ResponseUserDTO } from "src/users/dto/response-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class UserMapper {
    static createUserFromDTO(createDTO: CreateUserDto) {
        const user = new User()
        return Object.assign(user, createDTO)
    }

    static toResponseDTO(user: User) {
        const response = new ResponseUserDTO()
        return Object.assign(response, user)
    }

    static updateUserFromDTO(user: User, updateDTO: UpdateUserDto): User {
        return Object.assign(user, updateDTO)
    }
}