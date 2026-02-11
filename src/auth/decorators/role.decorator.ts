import { SetMetadata } from "@nestjs/common"
import { UserType } from "src/users/enums/User-role.enum"

export const ROLES_KEY = 'roles'
export const Roles = (...rolesArray: UserType[]) => SetMetadata(ROLES_KEY, rolesArray)
