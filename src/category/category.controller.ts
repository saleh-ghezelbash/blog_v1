import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Cat as Category } from "./category.entity";
import { CreateCategoryDto } from './dtos/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleEnum } from 'src/user/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

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
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(UserRoleEnum.ADMIN)
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
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(UserRoleEnum.ADMIN)
    @HttpCode(204)
    remove(@Param('id',ParseIntPipe) id: string){
      return this.categoryService.remove(id);
    }
}
