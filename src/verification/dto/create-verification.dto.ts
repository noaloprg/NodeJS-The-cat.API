import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"
import { UserLanguage } from "src/users/enums/User-language.enum"
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

export class CreateVerificationDto {
    //no APIPorperty / no endpoints
    @IsEmail()
    @MaxLength(150)
    targetEmail: string

    @IsString()
    verificationToken: string

    @IsString()
    @MaxLength(50)
    name?: string | null

    @IsString()
    @MinLength(8)
    password?: string | null
}
