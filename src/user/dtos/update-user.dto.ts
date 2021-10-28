import { UserRoleEnum } from "../user.entity";

export class UpdateUserDto {
    id: number;
    name: string;
    role: UserRoleEnum;
}