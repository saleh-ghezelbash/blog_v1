import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
// @UseGuards()
// isAdmin()
export class CommentController {
    constructor(private commentService:CommentService){}

    @Get()
    allComments(){
        return this.commentService.allComments();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.commentService.findOne(id);
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string){
        return this.commentService.deleteOne(id);
    }

    @Put(':id')
    isApproved(@Param('id') id:string,@Body('isApproved') isApproved:boolean){
        return this.commentService.isApproved(id,isApproved);
    }
}
