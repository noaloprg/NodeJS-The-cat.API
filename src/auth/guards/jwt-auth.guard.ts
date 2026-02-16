import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
//'jtw' -> passport name (import { ExtractJwt, Strategy } from "passport-jwt")
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info) {
        //if there's an error or JwtStrategy is null
        if (err || !user) {
            //if info of token...
            if (info?.name === 'TokenExpiredError') throw new UnauthorizedException('Token expired')

            throw new UnauthorizedException('Token invalid ')
        }
        //returns payload from JwtStrategy
        return user
    }
}