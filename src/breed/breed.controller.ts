import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BreedService } from './breed.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BEARER_KEY } from 'src/common/constants/keys';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from 'src/users/enums/User-role.enum';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) { }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Obtiene todas las razas de la BBDD' })
  @Get()
  async getAll() {
    return await this.breedService.findAll()
  }

  // ! PRUEBAS
  @Delete()
  async delete() {
    return this.breedService.deleteAll()
  }
}
