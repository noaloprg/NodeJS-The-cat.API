import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedMapper } from 'src/common/mappers/breed.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Breed]),
  ],
  controllers: [BreedController],
  providers: [BreedService, BreedMapper],
})
export class BreedModule { }
