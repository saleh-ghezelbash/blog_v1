import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Cat } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { Comment } from 'src/comment/comment.entity';
import { Tag } from 'src/tag/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { Repository } from 'typeorm';
import { CreateCommenttDto } from './dtos/create-comment.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    // private readonly categoryService: CategoryService,    
    // private readonly tagService: TagService
  ) { }

  public getPostsWithCommentCountQuery() // این متد یک کوئری قابل استفاده در بقیه متدها و کوئری های دیگر است
  {
    return this.postsRepository.createQueryBuilder('post')
      // تعداد کامنت های هر پست را تولید  میکند
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();

    // return this.postsRepository.find({
    //   relations:['category','comments']
    // });

    // return this.postsRepository.find({
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

    // return await this.postsRepository.createQueryBuilder('post')
    //   .orderBy('post.createdAt', 'DESC')
    //   .getMany();

    // return await this.getPostsWithCommentCountQuery()
    //   .orderBy('post.createdAt', 'DESC')
    //   .getMany();
  }

  async findOne(id: string): Promise<Post> {
    // return this.postsRepository.findOne(id);

    return await this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'cat')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.comments', 'comment','comment.isApproved = :isApproved', { isApproved: true })
      .andWhere('post.id = :id', { id })
      // .andWhere('comment.isApproved = :isApproved', { isApproved: true })
      // .select(['post','cat.title','tag.title'])
      .getOne()
  }

  // async create(
  //     createPostDto: CreatePostDto,
  //     // user: User
  // ): Promise<Post> {
  //     // console.log('createPostDto:', createPostDto);
  //     const { tags, category } = createPostDto;
  //     const cat: Cat = await this.categoryService.findOne(category.toString())
  //     const tag: Tag[] = [];
  //     tags.forEach(async t => {
  //         tag.push(await this.tagService.findOne(t.toString()));
  //     })

  //     return this.postsRepository.save({
  //         ...createPostDto,
  //         // user,
  //         category: cat,
  //         tags: tag,
  //         slug : slugify(createPostDto.title,{lower:true})
  //     });
  // }

  async create(
    createPostDto: CreatePostDto,
    // user: User
  ): Promise<Post> {

    const cat = await this.catRepository.findOne(createPostDto.categoryId);
    // const tags = await this.tagRepository.findByIds(updatePostDto.tagIds);
    const tags = await this.tagRepository.createQueryBuilder("tag")
      .where("tag.id IN (:...ids)", { ids: createPostDto.tagIds })
      .getMany();
    // const tags: Tag[] = [];
    // createPostDto.tagIds.forEach(async t => {
    //         tags.push(await this.tagRepository.findOne(t.toString()));
    //     })
    const post = this.postsRepository.create(createPostDto);
    // console.log('post:',post);
    // post.user = user;
    post.category = cat;
    post.tags = tags;
    // post.categoryId = createPostDto.categoryId
    // post.tags = createPostDto.tagsId

    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<string> {
    await this.postsRepository.delete(id);
    return 'ok'
  }

  async update(
    // id,
    updatePostDto: UpdatePostDto,
    // user: User
  ) {

    const cat = await this.catRepository.findOne(updatePostDto.categoryId);
    const tags = await this.tagRepository.findByIds(updatePostDto.tagIds);
    // const tags = await this.tagRepository.createQueryBuilder("tag")
    // .where("tag.id IN (:...ids)", { ids:updatePostDto.tagIds })
    // .getMany();

    const post = this.postsRepository.create(updatePostDto);
    post.category = cat;
    post.tags = tags;

    await this.postsRepository.save(post);

    return this.findOne(updatePostDto.id.toString())
  }

  async createComment(
    postId: string,
    createCommenttDto: CreateCommenttDto,
    // user: User
  ): Promise<Comment> {

    const post = await this.postsRepository.findOne(postId);
    const comment = this.commentRepository.create(createCommenttDto);
    comment.post = post;
    return this.commentRepository.save(comment);

  }
}
