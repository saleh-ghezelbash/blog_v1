import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat as Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
      ) { }
    
      findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
        // return this.categoriesRepository.find({
        //   // where:{
        //   //   id:MoreThan(id), //id و createdAt باهم and شده اند
        //   //   createdAt:MoreThan(new Date('2020-03-04T13:20:05'))
        //   // }
    
        //   // where:[
        //   //   {id:3},//id و createdAt باهم or شده اند
        //   //   {createdAt:Date.now}
        //   // ]
    
        //   // where:{description:Like('%تست%')}
    
        //   // order:{id:'DESC'}
    
        //   // take:2
    
        //   // select:['id','title']
        // });
      }
    
      findOne(id: string): Promise<Category> {
        return this.categoriesRepository.findOne(id);
      }
    
    //   async create(title:string): Promise<Category> {
    //     return await this.categoriesRepository.save({title});
    //   }
      async create(createCategoryDto:CreateCategoryDto): Promise<Category> {
        return await this.categoriesRepository.save(createCategoryDto);
      }
    
      async removeCat(id: string): Promise<string> {
        await this.categoriesRepository.delete(id);
        return 'ok'
      }

}
