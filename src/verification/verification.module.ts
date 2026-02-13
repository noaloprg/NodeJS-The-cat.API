import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { VerificationMapper } from 'src/common/mappers/verification.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Verification } from './entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  controllers: [VerificationController],
  providers: [VerificationService, VerificationMapper],
  exports: [VerificationService]
})
export class VerificationModule { }
