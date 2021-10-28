import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

      @Post()
      create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
        return this.tagService.create(createTagDto);
      }
    // @Post()
    // create(@Body('title') title): Promise<Tag> {
    //   return this.tagService.create(title);
    // }
    
      @Get()
      findAll(): Promise<Tag[]> {
        return this.tagService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string): Promise<Tag> {
        return this.tagService.findOne(id);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string): Promise<void> {
        return this.tagService.remove(id);
      }
}
