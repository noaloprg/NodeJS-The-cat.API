import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { CatModule } from 'src/cat/cat.module';
import { PetMapper } from 'src/common/mappers/pet.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    CatModule,
    PetMapper
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule { }
