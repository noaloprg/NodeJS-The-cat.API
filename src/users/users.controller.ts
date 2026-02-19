import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from './enums/User-role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BEARER_KEY } from 'src/common/constants/keys';

//key from .addBearerAuth() in swaggerConfig (main.ts)
@ApiBearerAuth(BEARER_KEY)
@UseGuards(JwtAuthGuard, RolesGuard)
//only access to ADMIN
@Roles(UserType.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Get('mail/:mail')
  @ApiOperation({ summary: 'Obtener usuario por mail' })
  async findOneByMail(@Param('mail') mail: string) {
    return await this.usersService.findOneByMail(mail)

  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar usuario por ID' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
