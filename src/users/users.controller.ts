import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from './enums/User-role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//key from .addBearerAuth() in swaggerConfig (main.ts)
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Get(':mail')
  async findOneByMail(@Param('mail') mail: string) {
    return await this.usersService.findOneByMail(mail)

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
