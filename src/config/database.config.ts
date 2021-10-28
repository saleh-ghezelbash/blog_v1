import { join } from 'path';
import {Cat} from 'src/category/category.entity';
import { Post } from 'src/post/post.entity';
import { Tag } from 'src/tag/tag.entity';


// database config for Mysql
export const mysqlConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'blogv1',
    synchronize: true,
    // entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    entities:[Tag,Post,Cat]
};


