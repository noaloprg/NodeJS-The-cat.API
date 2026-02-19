import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BEARER_KEY } from 'src/common/constants/keys';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserType } from 'src/users/enums/User-role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { VerifyDto } from './dto/verify.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion' })
  async login(@Body() loginDTO: LoginDTO) {
    //returns access token 
    return this.service.login(loginDTO)
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario' })
  async register(@Body() registerDTO: RegisterDTO) {
    return this.service.register(registerDTO)
  }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Get('unverified')
  @ApiOperation({ summary: 'Obtener todos los registros no verificados' })
  async unverified() {
    return this.service.findAll()
  }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post('reject')
  @ApiOperation({ summary: 'Rechazar todas los registros' })
  async reject() {
    return this.service.reject()
  }

  @ApiBearerAuth(BEARER_KEY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post('verify')
  @ApiOperation({ summary: 'Verificar un registro' })
  async verify(@Body() dto: VerifyDto) {
    return this.service.accept(dto)
  }

}