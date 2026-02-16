import { IsString, MaxLength } from "class-validator"

export class CreatePetDto {
    @IsString()
    @MaxLength(25)
    petName: string
}
