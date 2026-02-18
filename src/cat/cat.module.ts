import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { HttpModule } from '@nestjs/axios';
import { Breed } from 'src/breed/entities/breed.entity';
import { BreedModule } from 'src/breed/breed.module';
import { CatMapper } from 'src/common/mappers/cat.mapper';
import { BreedMapper } from 'src/common/mappers/breed.mapper';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    BreedModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('BASE_URL'),
        headers: {
          'x-api-key': configService.get('CAT_API_KEY')
        },
      })
    })
  ],
  controllers: [CatController],
  providers: [CatService, CatMapper, BreedMapper],
  exports: [CatService]
})
export class CatModule { }
