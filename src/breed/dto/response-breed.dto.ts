import { IsString, MaxLength } from "class-validator";

export class ResponseBreedDTO {
    id: number
    externalId: string
    name: string
    temperament: string
    origin: string
    description: string
    wikiUrl?: string | null
    createdAt: Date
    updatedAt?: Date | null
    deleteAt?: Date | null
}
