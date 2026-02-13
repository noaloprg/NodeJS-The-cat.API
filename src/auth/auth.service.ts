import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { VerificationService } from 'src/verification/verification.service';
import { VerificationMapper } from 'src/common/mappers/verification.mapper';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private verificationService: VerificationService,
        private mapper: VerificationMapper
    ) { }

    async login(loginDto: LoginDTO) {
        const userRequested = await this.userService.getUserByMail(loginDto.mail)

        if (!userRequested || userRequested.password !== loginDto.password) throw new UnauthorizedException('Access denied');

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

    async register(registerDTO: RegisterDTO) {
        const verifiTemp = this.mapper.createVerificationFromDTO(registerDTO)

        //service returns repsonse DTO
        const verification = this.verificationService.create(verifiTemp)        
        return verification
    }

}
