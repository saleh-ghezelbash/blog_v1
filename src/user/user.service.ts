import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
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

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  // async findByUserName(username: string) {
  //   return this.usersRepository.find({where:{email:username}});
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, confirmpassword } = createUserDto;

    //  if (name) {
    //     throw new HttpException('Name must be provied!',404);
    //  }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
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
}
