import { IsEmail, IsOptional, IsString, Max } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @Max(150)
    email: string
    
    @IsString()
    @IsOptional()
    @Max(50)
    nombre?: string

    @IsString()
    @IsOptional()
    @Max(50)
    password?: string
}
