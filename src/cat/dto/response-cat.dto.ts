import { IsInt, IsString } from "class-validator"

export class ResponseCatDTO {
    id: number
    externalId: string
    url: string
    width: number
    height: number
    createdAt: Date
    updatedAt: Date
    deleteAt?: Date | null
}
