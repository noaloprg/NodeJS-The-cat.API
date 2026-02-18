import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { HttpModule } from '@nestjs/axios';
import { Breed } from 'src/breed/entities/breed.entity';
import { BreedModule } from 'src/breed/breed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    HttpModule,
    BreedModule
  ],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule { }
