import { UserType } from "../enums/User-role.enum"
import { UserLanguage } from "../enums/User-language.enum"

export class ResponseUserDTO {
    id: number
    mail: string
    name?: string | null
    role: UserType
    language: UserLanguage
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}