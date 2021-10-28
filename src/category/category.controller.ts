import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Cat as Category } from "./category.entity";
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // @Post()
    // create(@Body('title') title): Promise<Category> {
    //   return this.categoryService.create(title);
    // }
    // @Post()
    // create(@Body() category): Promise<Category> {
    //   return this.categoryService.create(category.title);
    // }
    @Post()
    create(@Body() createCategoryDto:CreateCategoryDto): Promise<Category> {
      return this.categoryService.create(createCategoryDto);
    }
  
    @Get()
    findAll(): Promise<Category[]> {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id',new ParseIntPipe()) id):Promise<Category> {    
      return this.categoryService.findOne(id);
    }
  
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id',ParseIntPipe) id: string){
      return this.categoryService.remove(id);
    }
}
