import { UserType } from "../enums/User-role.enum"
import { UserLanguage } from "../enums/User-language.enum"

export class ResponseUserDTO {
    id: number
    mail: string
    name: string
    role: UserType
    language: UserLanguage
    createdAt: Date
    updatedAt?: Date | null
    deletedAt?: Date | null
}