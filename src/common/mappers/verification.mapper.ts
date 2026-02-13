import { Injectable } from "@nestjs/common";
import { CreateVerificationDto } from "src/verification/dto/create-verification.dto";
import { ResponseVerificationDTO } from "src/verification/dto/response-verification.dto";
import { Verification } from "src/verification/entities/verification.entity";

@Injectable()
export class VerificationMapper {

    createVerificationFromDTO(createDTO: CreateVerificationDto) {
        const verification = new Verification()
        return Object.assign(verification, createDTO)
    }

    toResponseDTO(verification: Verification) {
        const dto = new ResponseVerificationDTO()
        dto.id = verification.id
        dto.acceptedAt = verification.acceptedAt
        dto.createdAt = verification.createdAt
        dto.deletedAt = verification.deletedAt
        dto.name = verification.name
        dto.targetEmail = verification.targetEmail
        dto.updatedAt = verification.updatedAt
        dto.verificationToken = verification.verificationToken
        return Object.assign(dto, verification)
    }

}