import { IntersectionType, PartialType } from "@nestjs/mapped-types";
import { Length } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

// export class UpdatePostDto extends PartialType(CreatePostDto) {}

// export type UpdatePostDto = Partial<CreatePostDto>

// export class UpdatePostDto{
//     id:number;
//     @Length(2,200,
//         {
//             message:"تعداد کاراکتر برای عنوان پست بین 2 و 200 می باشد",
//             // groups:['create','update']
//         })
//     title: string;
//     content:string;
//     tagIds:number[];
//     imageCover:string;
//     categoryId: number;

// }

export class UpdatePostDto extends PartialType(CreatePostDto) {
    id:number;
}