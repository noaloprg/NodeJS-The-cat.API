import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { IsNull } from 'typeorm';
import { IsNumber } from 'class-validator';

export class UpdatePetDto {
    @IsNumber()
    ownerId: number
}
