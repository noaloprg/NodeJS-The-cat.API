import { IsInt, IsString } from "class-validator"

export class ResponseCatDTO {
    id: number
    externalId: string
    url: string
    width: number
    height: number
    petId?: number | null
    breedsId: number[] | null
    createdAt: Date
    updatedAt?: Date | null
    deleteAt?: Date | null
}
