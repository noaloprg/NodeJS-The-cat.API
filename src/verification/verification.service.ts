import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationMapper } from 'src/common/mappers/verification.mapper';
import { randomBytes } from 'crypto';
import { map, NotFoundError } from 'rxjs';
import { ErrorMessages } from 'src/common/constants/error-messages';

@Injectable()
export class VerificationService {
  @InjectRepository(Verification)
  private readonly repository: Repository<Verification>

  private readonly RESOURCE_NAME = 'verification'

  constructor(private readonly mapper: VerificationMapper) { }

  async create(createVerificationDto: CreateVerificationDto) {
    const verificationExists = await this.repository.exists({ where: { targetEmail: createVerificationDto.targetEmail } })

    if (verificationExists) throw new ConflictException(ErrorMessages.mailAlreadyRegistered());

    let verificationTemp = this.mapper.createVerificationFromDTO(createVerificationDto)

    verificationTemp.verificationToken = this.generateToken()

    await this.repository.save(verificationTemp)
    return this.mapper.toResponseUserDto(verificationTemp.targetEmail)
  }

  async findAllNotAccepted() {
    const allVerifications = await this.repository.find({ where: { acceptedAt: IsNull() } })
    return allVerifications.map(verif => this.mapper.toResponseDTO(verif))
  }

  async findOne(idVerif: number) {
    const verification = await this.checkExistence(idVerif)
    return this.mapper.toResponseDTO(verification)
  }

  async findEntityById(id: number) {
    return await this.checkExistence(id)
  }

  async update(idVerif: number) {
    const verification = await this.checkExistence(idVerif)
    verification.acceptedAt = new Date()
    return this.mapper.toResponseDTO(verification)
  }

  async deleteAllUnverified() {
    const allUnverified = await this.repository.find({ where: { acceptedAt: IsNull() } })
    allUnverified.forEach(
      verif => {
        verif.deletedAt = new Date(),
          verif.updatedAt = new Date()
      }
    )
    return (await this.repository.remove(allUnverified)).map(verif => this.mapper.toResponseDTO(verif))
  }

  private generateToken() {
    return randomBytes(16).toString('hex')
  }

  private async checkExistence(idVerif: number) {
    const verification = await this.repository.findOneBy({ id: idVerif })

    if (!verification)
      throw new NotFoundException(ErrorMessages.notFoundByIdMessage(this.RESOURCE_NAME, idVerif));

    return verification
  }

  public async acceptRegistry(id: number) {
    this.repository.update(id, { acceptedAt: new Date() })
  }

  //TESTING 
  async deleteAllDebug() {
    const all = await this.repository.find()

    return (await this.repository.remove(all)).map(verif => this.mapper.toResponseDTO(verif))
  }
}
