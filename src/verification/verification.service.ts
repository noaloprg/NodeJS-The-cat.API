import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationMapper } from 'src/common/mappers/verification.mapper';
import { randomBytes } from 'crypto';
import { NotFoundError } from 'rxjs';
import { ErrorMessages } from 'src/common/constants/error-messages';

@Injectable()
export class VerificationService {
  @InjectRepository(Verification)
  private readonly repository: Repository<Verification>

  private readonly RESOURCE_NAME = 'verification'

  constructor(private readonly mapper: VerificationMapper) { }

  async create(createVerificationDto: CreateVerificationDto) {
    let verificationTemp = this.mapper.createVerificationFromDTO(createVerificationDto)
    verificationTemp.verificationToken = this.generateToken()

    const verification = await this.repository.save(verificationTemp)
    return this.mapper.toResponseDTO(verification)
  }

  async findAll() {
    return (await this.repository.find()).map(ver => this.mapper.toResponseDTO(ver))
  }

  async findOne(idVerification: number) {
    const verification = await this.repository.findOneBy({ id: idVerification })

    if (!verification)
      throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idVerification));

    return this.mapper.toResponseDTO(verification)

  }

  update(id: number, updateVerificationDto: UpdateVerificationDto) {

  }

  async remove(idVerif: number) {
    const verification = await this.repository.findOneBy({ id: idVerif })

    if (!verification)
      throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idVerif));

    const verifDeleted = await this.repository.softRemove(verification)
    return this.mapper.toResponseDTO(verifDeleted)
  }

  private generateToken() {
    return randomBytes(16).toString('hex')
  }
}
