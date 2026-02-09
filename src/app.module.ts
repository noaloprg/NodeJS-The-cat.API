import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
        //loads entities
        autoLoadEntities: true,
        //when changes in Entities are made, all tables are created as new
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
