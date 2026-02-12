import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { User } from 'src/users/entities/user.entity';
import { UserSeeder } from 'src/users/entities/user.seeder';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) { }

    // JWTModule uses .registerAsync()
    async login(mail: string, pass: string) {
        const userRequested = await this.userService.getUserByMail(mail)

        if (!userRequested || userRequested.password !== pass) throw new UnauthorizedException('Access denied');

        //contains user info
        const payload = {
            sub: userRequested.id,
            mail: userRequested.mail,
            role: userRequested.role
        };
        return {
            // header (algorithm in JwtService) + payload + signature (secret JwtService)
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
