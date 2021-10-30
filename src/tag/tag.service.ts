import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
      ) {}

      findAll(): Promise<Tag[]> {
        return this.tagsRepository.find();
      }

      async create(createTagDto: CreateTagDto): Promise<Tag> {
        return await this.tagsRepository.save(createTagDto);
      }
    
      findOne(id: string): Promise<Tag> {
        return this.tagsRepository.findOne(id);
      }
    
      async removeTag(id: string): Promise<string> {
        await this.tagsRepository.delete(id);
        return 'ok';
      }
}
