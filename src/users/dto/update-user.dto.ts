import { IsEmail, IsEnum, IsOptional, IsString, Max } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { UserLanguage } from "../enums/User-language.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends CreateUserDto {
    @ApiProperty({
        enum : UserLanguage,
    })
    @IsEnum(UserLanguage)
    @IsOptional()
    language?: UserLanguage
}
