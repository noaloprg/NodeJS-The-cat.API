import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { VerificationService } from 'src/verification/verification.service';
import { VerificationMapper } from 'src/common/mappers/verification.mapper';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private verificationService: VerificationService,
        private mapper: VerificationMapper
    ) { }

    async login(loginDto: LoginDTO) {
        const userRequested = await this.userService.findEntityByEmail(loginDto.mail)

        //if there's no user found or password is incorrect, exception
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
        /*
        verifies if user exists before saving it into 'verification' table 
        for consistency between verification - user
        */
        await this.userService.checkExistanceByEmail(registerDTO.targetEmail)

        const verifiTemp = this.mapper.createVerificationFromDTO(registerDTO)
        //service returns repsonse DTO
        const verification = this.verificationService.create(verifiTemp)
        return verification
    }

    async findAll() {
        return this.verificationService.findAllNotAccepted()
    }

    async reject() {
        //hard delete
        return this.verificationService.deleteAllUnverified()
    }

    async accept(dto: VerifyDto) {
        //looks for verification entity
        const requested = await this.verificationService.findEntityById(dto.id)

        if (!requested) throw new NotFoundException(ErrorMessages.notFoundByIdMessage('record', dto.id))

        if (requested.verificationToken === dto.token) {
            //updates info of entity from table verification  
            this.verificationService.acceptRegistry(requested.id)
            
            return this.userService.createUserFromVerification(requested)
        }
        else throw new NotFoundException('token invalid')
    }

    async deleteAll() {
        return this.verificationService.deleteAllDebug()
    }
}
