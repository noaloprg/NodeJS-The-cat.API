import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './verification/jwt.strategy';
import { JwtAuthGuard } from './verification/jwt-auth.guard';

@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      //JWT config
      inject: [ConfigService],
      global: true,

      //token config
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '120s'
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule { }
