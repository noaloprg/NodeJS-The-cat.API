import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
//validates entry tokens
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            //gets info from token in request header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey: configService.get<string>('JWT_SECRET') || '',
        });
    }
    async validate(payload: any) {
        return {
            id: payload.sub,
            mail: payload.mail,
            role: payload.role
        }
    }
}