import { SetMetadata } from "@nestjs/common"
import { UserType } from "src/users/enums/User-role.enum"

export const ROLES_KEY = 'roles'
//links array with values of the UserType enum to a key
// '...' rest operator, groups params of decorator into an array
export const Roles = (...rolesArray: UserType[]) => SetMetadata(ROLES_KEY, rolesArray)
