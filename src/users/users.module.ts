import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMapper } from 'src/common/mappers/user.mapper';
import { PetMapper } from 'src/common/mappers/pet.mapper';
import { Pet } from 'src/pet/entities/pet.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMapper, PetMapper],
  imports: [
    TypeOrmModule.forFeature([User, Pet]),
  ],
  exports: [UsersService]
})
export class UsersModule { }
