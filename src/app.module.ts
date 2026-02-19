import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { VerificationModule } from './verification/verification.module';
import { AuthModule } from './auth/auth.module';
import { PetModule } from './pet/pet.module';
import { CatModule } from './cat/cat.module';
import { BreedModule } from './breed/breed.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST_PC'),
        port: +configService.get('POSTGRES_PORT_PC'),
        username: configService.get('POSTGRES_DOCKER_USER'),
        password: configService.get('POSTGRES_DOCKER_ROOT_PASSWORD'),
        database: `db_${configService.get('APP_NAME')}`,
        autoLoadEntities: true,
        //when changes in Entities are made, all tables are created as new
        // dropSchema:true,
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,

    VerificationModule,

    AuthModule,

    PetModule,

    CatModule,

    BreedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
