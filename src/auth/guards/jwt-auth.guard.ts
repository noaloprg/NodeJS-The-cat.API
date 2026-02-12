import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
//jtw -> passport name (import { ExtractJwt, Strategy } from "passport-jwt")
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info) {

        if (err || !user) {
            if (info?.name === 'TokenExpiredError') throw new UnauthorizedException('Token expired ')

            throw new UnauthorizedException('Token invalid ')
        }
        return user

    }
}