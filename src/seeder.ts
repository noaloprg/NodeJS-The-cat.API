import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import { User } from "./users/entities/user.entity";
import { UserSeeder } from "./users/entities/user.seeder";

seeder({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),

        //defines in which DB has to save seeder data
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST_PC'),
                port: +configService.get('POSTGRES_PORT_PC'),
                username: configService.get('POSTGRES_DOCKER_USER'),
                password: configService.get('POSTGRES_DOCKER_ROOT_PASSWORD'),
                database: `db_${configService.get('APP_NAME')}`,
                entities: [User],
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([User])
    ]

}).run([UserSeeder])
