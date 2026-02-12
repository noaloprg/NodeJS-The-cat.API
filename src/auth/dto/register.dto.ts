import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDTO {
    @IsEmail()
    @MaxLength(150)
    targetEmail: string

    @IsString()
    @MaxLength(50)
    name?: string | null

    @IsString()
    @MinLength(8)
    password?: string | null
}