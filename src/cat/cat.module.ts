import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CatMapper } from '../common/mappers/cat.mapper';
import { BreedMapper } from '../common/mappers/breed.mapper';
import { BreedModule } from '../breed/breed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    BreedModule,
  ],
  controllers: [CatController],
  providers: [CatService, CatMapper, BreedMapper],
  exports: [CatService]
})
export class CatModule { }
