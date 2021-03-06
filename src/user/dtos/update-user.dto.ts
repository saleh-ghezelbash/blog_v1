import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { UserRoleEnum } from "../user.entity";

export class UpdateUserDto {
    id: number;
    
    @IsString({message:"Name must be a string!"})
    @MinLength(2,{message:"Minimom characters for Name is 2!"})
    @MaxLength(20,{message:"Maximom characters for Name is 20!"})
    name:string;
    
    @IsEnum(UserRoleEnum,{message:`role must have a one of ${UserRoleEnum.ADMIN}, ${UserRoleEnum.PUBLISHER} or ${UserRoleEnum.USER} value`})
    role: UserRoleEnum;
}