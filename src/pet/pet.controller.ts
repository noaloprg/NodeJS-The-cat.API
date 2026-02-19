import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BEARER_KEY } from 'src/common/constants/keys';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserType } from 'src/users/enums/User-role.enum';

@Controller('pet')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PetController {
  constructor(private readonly petService: PetService) { }

  @ApiBearerAuth(BEARER_KEY)
  @Roles(UserType.ADMIN, UserType.USER)
  @Post()
  async createPet(@Body() createPetDTO: CreatePetDto, @Req() req: any) {
    //* req.user is created by Passport from JWT, and properties from .user are from payload of validate()
    const userId = req.user.id
    return this.petService.createPetRelated(createPetDTO, userId)
  }
}
