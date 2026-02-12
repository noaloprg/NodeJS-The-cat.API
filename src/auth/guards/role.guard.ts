import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserType } from "src/users/enums/User-role.enum";
import { ROLES_KEY } from "../../common/decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        //obtains the values of all decorators from the class and methods
        const requiredRoles =
            this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if (!requiredRoles) return true;

        //all info HttpRequest 
        const request = context.switchToHttp().getRequest()
        
        //user data from HttpRequest
        const userRequest = request.user;

        //role value verification
        return requiredRoles.some((role) => userRequest?.role === role)
    }
}