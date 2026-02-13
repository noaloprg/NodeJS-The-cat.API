import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class VerifyDto {
    @ApiProperty({
        example: '1'
    })
    @IsNumber()
    id: number

    @ApiProperty({
        example: '81f9a39b333b8a50dff986fb598d474d'
    })
    @IsString()
    token: string
}