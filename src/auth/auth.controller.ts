import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BEARER_KEY } from 'src/common/constants/keys';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from 'src/users/enums/User-role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    //returns access token 
    return this.service.login(loginDTO)
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.service.register(registerDTO)
  }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Get('unverified')
  async unverified() {
    return this.service.findAll()
  }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post('reject')
  async reject() {
    return this.service.reject()
  }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post('verify/:id/:token')
  async verify(@Param('id') id : number, @Param('token') token:string) {
    return this.service.accept(id, token)
  }


}
