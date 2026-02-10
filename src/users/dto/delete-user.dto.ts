import { IsInt, IsPositive } from "class-validator";

export class DeleteUserDTO{
    @IsInt()
    @IsPositive()
    id: number
}