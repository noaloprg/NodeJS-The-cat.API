import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from 'src/users/enums/User-role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { BEARER_KEY } from 'src/common/constants/keys';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) { }

  @ApiBearerAuth(BEARER_KEY)
  @Get('api:amount')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Obtiene gatos de The Cat API' })
  async getCats(@Param('amount') amount: number = 1) {
    return await this.catService.createCatBreedFromApi(amount)
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los gatos de la BBDD' })
  async getAll() {
    return await this.catService.getAllCats()
  }
}
