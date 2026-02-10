import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class DeleteUserDTO{
    @ApiProperty({
        example: '0'
    })
    @IsInt()
    @IsPositive()
    id: number
}