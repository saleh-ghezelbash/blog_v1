import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/database.config';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { Tag } from './tag/tag.entity';
import { Post } from './post/post.entity';
import { Cat } from './category/category.entity';
import { UserModule } from './user/user.module';
import { Comment } from './comment/comment.entity';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'blogv1',
    synchronize: true,
    // entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    entities:[Tag,Post,Cat,Comment,User]
}), TagModule, CommentModule, CategoryModule, PostModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}