import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { CatModule } from 'src/cat/cat.module';
import { PetMapper } from 'src/common/mappers/pet.mapper';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    CatModule,
    UsersModule,
  ],
  controllers: [PetController],
  providers: [PetService, PetMapper],
})
export class PetModule { }
