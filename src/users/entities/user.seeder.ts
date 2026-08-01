import { Injectable } from "@nestjs/common";
import { Seeder } from "nestjs-seeder";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserType } from "../enums/User-role.enum";

@Injectable()
export class UserSeeder implements Seeder {

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

    private readonly adminEmail = 'admin@admin.com'

    // seeding method from Seeder class
    async seed() {

        // presence validation 
        const adminExists = await this.userRepository.findOne({
            where: { mail: this.adminEmail },
        })

        // it exists
        if (adminExists != null) {
            console.log("Administrador ya presente, no se realiza el seeding")
            return
        }

        // it doesnt exists
        const admin = this.userRepository.create({
            mail: this.adminEmail,
            name: 'admin',
            password: 'admin1234',
            role: UserType.ADMIN,
        })

        await this.userRepository.save(admin)

        console.log("Admin creado con correo: " + admin.mail)

    }

    drop(): Promise<any> {
        throw new Error('Method not implemented')
        //return this.UserRepository.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE')
    }

}