import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'user@gmail.com',
    })
    @IsEmail()
    @MaxLength(150)
    mail: string

    @ApiProperty({
        example: 'user',
    })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    name: string

    @ApiProperty({
        example: '12345678',
    })
    @IsString()
    @IsOptional()
    @MinLength(8)
    password: string
}
