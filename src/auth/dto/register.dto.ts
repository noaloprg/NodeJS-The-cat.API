import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDTO {
    @ApiProperty({
        example: 'user@gmail.com'
    })
    @IsEmail()
    @MaxLength(150)
    targetEmail: string

    @ApiProperty({
        example: 'person'
    })
    @IsString()
    @MaxLength(50)
    name?: string | null

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @MinLength(8)
    password?: string | null
}