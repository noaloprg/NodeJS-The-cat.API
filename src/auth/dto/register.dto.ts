import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDTO {
    @ApiProperty({
        example: 'pepe@gmail.com'
    })
    @IsEmail()
    @MaxLength(150)
    targetEmail: string

    @ApiProperty({
        example: 'pepe'
    })
    @IsString()
    @MaxLength(50)
    name: string 

    @ApiProperty({
        type: String,
        example: '12345678'
    })
    @IsString()
    @MinLength(8)
    password: string 
}