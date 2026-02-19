import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BEARER_KEY } from 'src/common/constants/keys';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserType } from 'src/users/enums/User-role.enum';

@Controller('pet')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth(BEARER_KEY)

export class PetController {
  constructor(private readonly petService: PetService) { }

  //* Assigning pet to user
  @Roles(UserType.ADMIN, UserType.USER)
  @Post('user/assign')
  @ApiOperation({ summary: 'Usuario se asigna un pet de la BD' })
  async createPet(@Body() createPetDTO: CreatePetDto, @Req() req: any) {
    //* req.user is created by Passport from JWT, and properties from .user are from payload of validate()
    const userId = req.user.id
    return this.petService.createPetRelated(createPetDTO, userId)
  }

  //* see all pets from actual user authorized
  @Roles(UserType.USER, UserType.ADMIN)
  @Get('/user/pets')
  @ApiOperation({ summary: 'Usuario ve todos los pets que tiene' })
  async findAllUserPets(@Req() req: any) {
    const userId = req.user.id
    return this.petService.getAllUserPets(userId)
  }

  // * free pet for others to adopt it
  @Roles(UserType.USER, UserType.ADMIN)
  @Patch('/user/free/:idPet')
  @ApiOperation({ summary: 'Usuario libera mascota de su propiedad' })
  async freePet(@Req() req: any, @Param('idPet') idPet: number) {
    const userId = req.user.id
    return this.petService.freePet(userId, idPet)
  }

  // * user adopts an existance pet 
  @Roles(UserType.USER, UserType.ADMIN)
  @Patch('/user/adopt/:idPet')
  @ApiOperation({ summary: 'Usuario adopta una mascota sin dueño' })
  async adopt(@Req() req: any, @Param('idPet') idPet: number) {
    const userId = req.user.id
    return this.petService.adoptPet(userId, idPet)
  }

  // * see all pets 
  @Roles(UserType.USER, UserType.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Lista todas las mascotas sin dueño' })
  async getAll() {
    return this.petService.getAllPets()
  }

  @Roles(UserType.ADMIN)
  @Patch('remove-owner/:idPet')
  @ApiOperation({ summary: 'libera una mascota de un propietario' })
  async removeFromOwner(@Param('idPet') idPet: number) {
    return this.petService.removePetFromUser(idPet)
  }

}
