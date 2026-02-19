import { ResponsePetDTO } from "src/pet/dto/response-pet.dto";
import { ResponseUserDTO } from "./response-user.dto";

export class ResponseUserPetDTO extends ResponseUserDTO {
    pets: ResponsePetDTO[]
}