import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        example: 'user@gmail.com'
    })
    @IsEmail()
    @MaxLength(150)
    mail: string

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @MinLength(8)
    password: string

}