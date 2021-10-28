import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) { }

    async allComments(): Promise<Comment[]> {
        return await this.commentRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.post', 'post')
            // .leftJoinAndSelect('comment.user', 'user')
            .orderBy({
                "comment.isApproved": "ASC",
                "post.createdAt": "ASC",
            })
            .select(['comment', 'post.title', 'post.createdAt'
                // 'user.name'
            ])
            .getMany()
    }

    async findOne(id: string): Promise<Comment> {
        return await this.commentRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.post', 'post')
            // .leftJoinAndSelect('comment.user', 'user')
            .andWhere('comment.id = :id', { id })
            // .orderBy('comment.isApproved = :isApproved', { isApproved: true })
            .select(['comment', 'post.title', 'post.createdAt'
                // 'user.name'
            ])
            .getOne()
    }

    async deleteOne(id: string): Promise<string> {
        await this.commentRepository.delete(id);
        return 'ok'
    }

   async isApproved(id:string, isApproved: boolean) {
         await this.commentRepository.update(id,{isApproved})
         // return await this.commentRepository.createQueryBuilder()
         // .update(Comment)
         // .set({isApproved})
         // .where("id = :id", { id })
         // .execute();
         return this.commentRepository.findOne(id);
    }
}
