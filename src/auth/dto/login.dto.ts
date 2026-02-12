import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        example: 'admin@admin.com'
    })
    @IsEmail()
    @MaxLength(150)
    mail: string

    @ApiProperty({
        example: 'admin1234'
    })
    @IsString()
    @MinLength(8)
    password: string

}