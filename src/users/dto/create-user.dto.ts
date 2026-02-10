import { IsEmail, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @Max(150)
    email: string

    @IsString()
    @IsOptional()
    @Max(50)
    nombre?: string

    @IsString()
    @IsOptional()
    @Min(8)
    password?: string
}
