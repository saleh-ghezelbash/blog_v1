import { IsEmail, IsString,IsNumber,Max,Min, Length } from "class-validator";
import { Cat } from "src/category/category.entity";
import { Tag } from "src/tag/tag.entity";


export class CreatePostDto{
    @Length(2,200,
        {
            message:"تعداد کاراکتر برای عنوان پست بین 2 و 200 می باشد",
            // groups:['create','update']
        })
    title: string;
    content:string;
    tagIds:number[];
    // tags:Tag;
    imageCover:string;
    categoryId: number;
    // category: Cat;
    // category: number;

}

