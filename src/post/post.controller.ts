import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreateCommenttDto } from './dtos/create-comment.dto';
import { Comment } from 'src/comment/comment.entity';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    // @UsePipes(new ValidationPipe({groups:['create']}))
    @Post()
    create(
        @Body(
            // ValidationPipe
        ) createPostDto: CreatePostDto,
        // @CurrentUser() user: User
    ): Promise<PostEntity> {
        // console.log('dto:', createPostDto);

        return this.postService.create(
            createPostDto
            // , user
        );
    }

    @Get()
    findAll(): Promise<PostEntity[]> {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<string> {
        return this.postService.remove(id);
    }

    // @UsePipes(new ValidationPipe({groups:['create']}))
    @Put()
    // @Put(':id')
    update(
        // @Param('id') id: string,
        @Body(
            // ValidationPipe
        ) updatePostDto: UpdatePostDto,
        // @CurrentUser() user: User
    ){

        return this.postService.update(
            // id,
            updatePostDto
            // , user
        );
    }

    @Post(':postId/comment')
    createComment(
        @Param('postId') postId: string,
        @Body(
            // ValidationPipe
        ) createCommenttDto: CreateCommenttDto,
        // @CurrentUser() user: User
    ): Promise<Comment> {
        // console.log('dto:', createPostDto);

        return this.postService.createComment(
            postId,
            createCommenttDto
            // , user
        );
    }
}
