import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, MaxLength, Min } from "class-validator"

export class CreatePetDto {
    @ApiProperty({ example: 'tobby' })
    @IsString()
    @MaxLength(25)
    petName: string

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(0)
    animalId: number
}
