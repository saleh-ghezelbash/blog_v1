import { Comment } from 'src/comment/comment.entity';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRoleEnum{
    ADMIN='ادمین',
    USER='کاربر',
    PUBLISHER='نویسنده'
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column('enum',{enum:UserRoleEnum,default:UserRoleEnum.USER})
    role:UserRoleEnum;

    @OneToMany(() => Post,(post) => post.user)
    posts:Post[]

    // @OneToMany(() => Comment,(comment) => comment.user)
    // comments:Comment[]
}