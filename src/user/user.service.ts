import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    // return this.usersRepository.findOne(id);
    
    return await this.usersRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.posts', 'post')
    .leftJoinAndSelect('post.comments', 'comment', 'comment.isApproved = :isApproved', { isApproved: true })
    .andWhere('user.id = :id', { id })
    // .select(['post','cat.title','tag.title'])
    .getOne()

  }


  async remove(id: string): Promise<string> {
    await this.usersRepository.delete(id);
    return 'ok'
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {

    const user = this.usersRepository.create(updateUserDto);
    await this.usersRepository.save(user);
    return this.findOne(updateUserDto.id.toString())
  }

  async findProfile(id: string): Promise<User> {
    return await this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .andWhere('user.id = :id', { id })
      .getOne();
  }

  async deleteProfile(user: User): Promise<string> {
    await this.usersRepository.delete(user.id);
    return 'ok'
  }

  async updateProfile(user: User, updateProfileDto: UpdateProfileDto): Promise<User> {

    const u = this.usersRepository.create({
      id: user.id,
      ...updateProfileDto
    });
    await this.usersRepository.save(u);
    return this.findOne(user.id.toString())
  }

  async myProfile(user: User): Promise<User> {
    return this.findOne(user.id.toString());
  }
}
