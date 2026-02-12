import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @IsEmail()
    @MaxLength(150)
    mail: string

    @IsString()
    @MinLength(8)
    password: string

}