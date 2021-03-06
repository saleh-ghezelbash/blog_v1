import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDto{
    
    @IsString({message:"Name must be a string!"})
    @MinLength(2,{message:"Minimom characters for Name is 2!"})
    @MaxLength(20,{message:"Maximom characters for Name is 20!"})
    name:string;
}