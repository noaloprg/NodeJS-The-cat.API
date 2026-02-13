import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { VerificationMapper } from 'src/common/mappers/verification.mapper';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, VerificationMapper],
  exports: [VerificationService]
})
export class VerificationModule { }
