import { IsString, MaxLength } from "class-validator";

export class ResponseBreedDTO {
    name: string
    temperament: string
    origin: string
    description: string
    wikiUrl: string
    createdAt: Date
    updatedAt: Date
    deleteAt?: Date | null
}
