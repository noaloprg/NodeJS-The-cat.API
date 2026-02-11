import { Injectable } from "@nestjs/common";
import { Seeder } from "nestjs-seeder";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserType } from "../enums/User-role.enum";

@Injectable()
export class UserSeeder implements Seeder {
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>

    seed(): Promise<any> {
        const admin = this.UserRepository.create({
            mail: 'admin@admin.com',
            name: 'admin',
            password: 'admin1234',
            role: UserType.ADMIN,

        })
        return this.UserRepository.save(admin)
    }
    drop(): Promise<any> {
        throw new Error('Method not implemented')
        //return this.UserRepository.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE')
    }

}