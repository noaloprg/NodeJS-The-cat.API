import { IsInt, IsString } from "class-validator"

export class ResponseCatDTO {
    externalId: string
    url: string
    width: number
    height: number
    createdAt: Date
    updatedAt: Date
    deleteAt?: Date | null
}
