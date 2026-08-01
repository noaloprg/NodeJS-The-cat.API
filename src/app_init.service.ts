import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users/entities/user.entity";
import { UserType } from "./users/enums/User-role.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSeeder } from "./users/entities/user.seeder";

// Class that acts as a service for seeding the DB initially for creating the admin
@Injectable()
export class AppInitializationService implements OnApplicationBootstrap {

    constructor(
        private readonly adminSeeder: UserSeeder
    ) { }

    onApplicationBootstrap() {
        this.adminSeeder.seed()
    }

}