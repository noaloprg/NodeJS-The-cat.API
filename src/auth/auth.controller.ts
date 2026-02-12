import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    //returns access token 
    return this.authService.login(loginDTO)
  }
}
