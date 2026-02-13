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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzA5ODc0NTYsImV4cCI6MTc3MDk4NzU3Nn0.wteqCKJ7i_PtIcBCJVIoJBJ04m91RJqK8OavlbWgPbw