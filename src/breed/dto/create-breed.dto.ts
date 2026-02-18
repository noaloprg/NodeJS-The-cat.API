import { Expose } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

export class CreateBreedDto {
    @IsString()
    @MaxLength(25)
    name: string

    @IsString()
    temperament: string

    @IsString()
    origin: string

    @IsString()
    description: string

    @Expose({ name: 'wikipedia_url' })
    @IsString()
    wikiUrl: string

}
