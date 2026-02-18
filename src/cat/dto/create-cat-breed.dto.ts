import { CreateCatDto } from "./create-cat.dto";
import { CreateBreedDto } from "src/breed/dto/create-breed.dto";

/* 
CreateCatDTO (1 cat) with List of CreateBreedDTO (many breeds)
Creates 1 cat and many breeds at the same time
*/
export class CreateCatWithBreedDTO {
    //implements validations from those DTOs
    cat: CreateBreedDto
    listBreeds: CreateBreedDto[]
}